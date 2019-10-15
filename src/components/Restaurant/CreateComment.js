import React, { Component, Fragment } from 'react'
// import { withRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'

import CommentForm from '../Restaurant/CommentForm'
import Comment from '../Restaurant/Comment'
class CreateComment extends Component {
  state = {
    comment: {
      text: '',
      restaurant: ''
    },
    updated: false,
    deleted: false
  }
  resetForm = () => {
    const comment = {
      text: '',
      post: this.props.restaurant._id
    }
    this.setState({ comment })
  }
  handleChange = event => {
    this.setState({
      comment: {
        ...this.state.comment,
        [event.target.name]: event.target.value,
        restaurant: this.props.restaurant._id
      }
    })
  }

  delete = async (id, user) => {
    try {
      await axios({
        method: 'DELETE',
        url: `${apiUrl}/comments/${id}`,
        headers: {
          Authorization: `Token token=${user.token}`
        }
      })
      this.setState({ deleted: true })
      this.props.alert({
        heading: 'Success!!!!',
        message: 'Deleted success',
        variant: 'success'
      })
      this.props.updateCheck()
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
        this.resetForm()
        this.props.updateCheck()
        // this.props.updateCommentState()
        // this.props.history.push(`/restaurants/${this.state.comment.restaurant}`)
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
    // let editButton = ''
    if (this.props.restaurant && this.props.user) {
      // if (!this.state.geted) {
      restaurantId = this.props.restaurant._id
      // const  commentsInside = this.props.restaurant
      allComment = (
        this.props.restaurant.comments.map(com => (
          <Comment updateCommentState={this.props.updateCommentState} id={restaurantId} key={com._id} com={com} user={this.props.user} handleDelete={this.delete} />
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
        /> : ''}

        {allComment}
      </Fragment>
    )
  }
}

export default withRouter(CreateComment)
