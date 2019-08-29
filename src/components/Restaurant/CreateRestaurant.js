import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import RestaurantForm from '../Restaurant/RestaurantForm'

class CreateRestaurant extends Component {
    state = {
      restaurant: {
        title: '',
        text: ''
      }
    }

    handleChange = event => {
      this.setState({
        restaurant: {
          ...this.state.restaurant,
          [event.target.name]: event.target.value
        }
      })
    }

    handleSubmit = event => {
      event.preventDefault()
      const token = this.props.user.token
      axios({
        method: 'POST',
        url: `${apiUrl}/restaurants`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          restaurant: this.state.restaurant
        }
      })
        .then(response => {
          this.props.alert({
            heading: 'Success!!!!',
            message: 'You created a restaurant.',
            variant: 'success'
          })
          this.props.history.push(`/restaurants/${response.data.restaurant._id}`)
        })
        .catch(console.error)
    }

    render () {
      return (
        <RestaurantForm
          restaurant={this.state.restaurant}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
}

export default withRouter(CreateRestaurant)
