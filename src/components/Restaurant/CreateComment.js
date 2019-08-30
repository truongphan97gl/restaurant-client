import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

import CommentForm from '../Restaurant/CommentForm'

class CreateComment extends Component {
    state = {
      comment: {
        text: '',
        restaurant: ''
      },
      updated: false,
      deleted: false
    }
    responseFromGet= ''
    handleChange = event => {
      this.setState({
        comment: {
          ...this.state.comment,
          [event.target.name]: event.target.value,
          restaurant: this.props.restaurant._id
        }
      })
    }

    delete = async () => {
      try {
        await axios({
          method: 'DELETE',
          url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
          headers: {
            Authorization: `Token token=${this.props.user.token}`
          }
        })
        this.setState({ deleted: true })
        this.props.alert({
          heading: 'Success!!!!',
          message: 'Deleted success',
          variant: 'success'
        })
      } catch (error) {
        this.props.alert({
          heading: 'Failure!!!!',
          message: 'Deleted Failure',
          variant: 'warning'
        })
      }
    }

    handleSubmit = event => {
      event.preventDefault()
      let token = ''
      if (this.props.user) {
        token = this.props.user.token
      }
      axios({
        method: 'POST',
        url: `${apiUrl}/comments`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          comment: this.state.comment
        }
      })
        .then(response => {
          this.props.alert({
            heading: 'Success!!!!',
            message: 'You created a comment.',
            variant: 'success'
          })
          this.setState({ geted: true })
          this.props.restaurant.comments.push(response.data.comment)
          response.data.comment.owner = {}
          response.data.comment.owner.email = this.props.user.email
          this.props.history.push(`/restaurants/${this.state.restaurant}`)
        })
        .catch(() => {
          this.props.alert({
            heading: 'Failure!!!!',
            message: 'Created Failure',
            variant: 'warning'
          })
        })
    }

    render () {
      let restaurantId = ''
      //   let commentsInside = ''
      let allComment = ''
      const refreshPage = ''
      // let editButton = ''
      if (this.props.restaurant && this.props.user) {
        // if (!this.state.geted) {
        restaurantId = this.props.restaurant._id

        // const  commentsInside = this.props.restaurant
        allComment = (
          this.props.restaurant.comments.map(com => (
            <React.Fragment key={com._id}>
              <p >{com.owner.email}: {com.text}</p>
              {/* // editButton = ( */}
              <Link to={`/comments/${com._id}/edit`}>
                {this.props.user._id === com.owner._id ? <Button>Updated</Button> : ''}
              </Link>
            </React.Fragment>

            // )
          ))
        )
      }
      return (
        <Fragment>
          {this.props.user ? <CommentForm
            comment={this.state.comment}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            id={restaurantId}
          /> : '' }

          {refreshPage}
          {allComment}
        </Fragment>
      )
    }
}

export default withRouter(CreateComment)
