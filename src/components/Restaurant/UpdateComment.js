import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import CommentForm from '../Restaurant/CommentForm'

class UpdateRestaurant extends Component {
    state = {
      comment: null
    }
    componentDidMount () {
      axios(`${apiUrl}/comments/${this.props.match.params.id}`)
        .then(response => {
          this.setState({ comment: response.data.comment })
        })
        .catch(() => this.props.alert({
          heading: 'Error',
          message: 'Something went wrong',
          variant: 'danger'
        }))
    }
    delete = async () => {
      try {
        await axios({
          method: 'DELETE',
          url: `${apiUrl}/comments/${this.props.match.params.id}`,
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
          message: 'Failure to do action',
          variant: 'warning'
        })
      }
    }
    handleChange = event => {
      this.setState({
        comment: {
          ...this.state.comment,
          [event.target.name]: event.target.value
        }
      })
    }

    handleSubmit = event => {
      event.preventDefault()
      axios({
        method: 'PATCH',
        url: `${apiUrl}/comments/${this.state.comment._id}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          comment: this.state.comment
        }
      })
        .then(response => {
          this.setState({
            updated: true
          })
          this.props.alert({
            heading: 'Success!!!!',
            message: 'You updated a restaurant.',
            variant: 'success'
          })
        //   this.props.history.push(`/restaurants/${response.data.comment.restaurant}`)
        })
        .catch(() => {
          this.props.alert({
            heading: 'Failure!!!!',
            message: 'Failure to do action',
            variant: 'warning'
          })
        })
    }

    render () {
      const deletedButton = <Button variant="danger" onClick={this.delete}>Delete This Comment</Button>
      if (!this.state.comment) {
        return (
          <h1>Loading... </h1>
        )
      }
      if (this.state.updated || this.state.deleted) {
        return (<Redirect to={
          {
            pathname: '/restaurants/' + this.state.comment.restaurant
          }
        } />)
      }
      return (
        <React.Fragment>
          <CommentForm
            comment={this.state.comment}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {deletedButton}

        </React.Fragment>

      )
    }
}

export default withRouter(UpdateRestaurant)
