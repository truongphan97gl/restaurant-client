import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CreateComment from '../../components/Restaurant/CreateComment'
import Button from 'react-bootstrap/Button'
import {
  Card, CardHeader, CardFooter, CardBody, CardText
} from 'reactstrap'
class Restaurant extends Component {
  // constructor
  constructor () {
    // super call
    super()

    this.state = {
      restaurant: null,
      deleted: false,
      liked: false,
      updateComments: false
    }
  }

  updateCommentState = () => this.setState({ updateComments: true })
  componentDidMount () {
    axios(`${apiUrl}/restaurants/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ restaurant: response.data.restaurant })
        this.likeChecking()
      })
      .catch(() => {
        this.props.alert({
          heading: 'Failure!!!!',
          message: 'Failure to do action',
          variant: 'warning'
        })
      })
  }
  like = () => {
    this.setState({ liked: !this.state.liked })
    let token = ''
    if (this.props.user) {
      token = this.props.user.token
    }
    const likeObject = {
      restaurant: this.state.restaurant._id
    }
    axios({
      method: 'POST',
      url: `${apiUrl}/likes`,
      headers: {
        'Authorization': `Bearer ${token}`
      },

      data: {
        like: likeObject
      }
    })
      .then(response => {
        this.updateCommentState()
      })
  }
  unlike = () => {
    // TODO: PROBLEM WITH CLICK LIKE AND UNLIKE MULTIPLE TIMES
    this.setState({ liked: !this.state.liked })
    let token = ''
    if (this.props.user) {
      token = this.props.user.token
    }
    let id = ''
    let foundLike = null
    if (this.props.user) {
      foundLike = this.state.restaurant.likes.find(like => like.owner._id === this.props.user._id)
      if (foundLike) {
        id = foundLike._id
      }
    }

    axios({
      method: 'DELETE',
      url: `${apiUrl}/likes/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        this.updateCommentState()
      })
  }

  likeChecking = () => {
    let foundLike = null
    if (this.props.user) {
      foundLike = this.state.restaurant.likes.find(like => like.owner._id === this.props.user._id)
    }
    if (foundLike) {
      this.setState({ liked: true })
    } else {
      this.setState({ liked: false })
    }
  }

  delete = () => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })

        this.updateCommentState()
      })
      .then(() => {
        this.props.alert({
          heading: 'Success!!!!',
          message: 'Deleted success',
          variant: 'success'
        })
      })

      .catch((ß) => {
        this.props.alert({
          heading: 'Failure!!!!',
          message: 'Failure to do action',
          variant: 'warning'
        })
      })
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.updateComments) {
      axios(`${apiUrl}/restaurants/${this.props.match.params.id}`)
        .then(response => {
          this.setState({ restaurant: response.data.restaurant })
          this.setState({ updateComments: false })
        })
        .catch(() => {
          this.props.alert({
            heading: 'Failure!!!!',
            message: 'Failure to do action',
            variant: 'warning'
          })
        })
    }
  }
  // render
  render () {
    const { deleted } = this.state
    const likeButton = <Button onClick={this.like}>Like 👍</Button>
    const unlikeButton = <Button variant="danger" onClick={this.unlike}>Unlike 👎</Button>
    let editButton = ''
    let deleteButton = ''
    let restaurantJsx = this.state.restaurant
    let showLike = ''
    if (this.props.user) {
      showLike = this.state.liked ? unlikeButton : likeButton
    }
    if (restaurantJsx && this.props.user) {
      // if (this.props.user !== null) {
      const userID = this.props.user._id
      if (this.state.restaurant.owner === userID) {
        // Edit button
        editButton = (
          <Link to={`/restaurants/${this.props.match.params.id}/edit`}>
            <Button>Update</Button>
          </Link>
        )
        deleteButton = (
          <Button variant="danger" onClick={this.delete}>Delete This Restaurant</Button>
        )
      } else {
        editButton = (
          ''
        )
        deleteButton = (
          ''
        )
      }
      // }
    }
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/restaurants'
        }
      } />
    } else
    if (restaurantJsx) {
      let buttonShow = ''

      if (this.props.user) {
        const userID = this.props.user._id
        if (this.state.restaurant.owner === userID) {
          buttonShow = (
            <CardFooter>
              {deleteButton}
              {editButton}
            </CardFooter>
          )
        }
      }

      restaurantJsx = (
        <div key={this.state.restaurant._id}>
          <Card>
            <CardHeader>
              <h1>{this.state.restaurant.title}</h1>
              {showLike}

            </CardHeader>
            <CardBody>
              {/* <CardTitle>Special Title Treatment</CardTitle> */}
              <CardText>{this.state.restaurant.text}.</CardText>

            </CardBody>
            {buttonShow}
          </Card>
        </div>
      )
    } else {
      restaurantJsx = (
        'Loading...'
      )
    }

    return (
      <div>
        {restaurantJsx}
        <div>
          <Link to="/restaurants">Back to all the restaurant</Link>
        </div>
        <CreateComment updateCheck={this.updateCommentState} user={this.props.user} alert={this.props.alert} restaurant={this.state.restaurant} />
      </div>

    )
  }
}

export default Restaurant
