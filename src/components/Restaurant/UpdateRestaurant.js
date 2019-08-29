import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import RestaurantForm from '../Restaurant/RestaurantForm'

class UpdateRestaurant extends Component {
    state = {
      restarant: null
    }

    componentDidMount () {
      axios(`${apiUrl}/restaurants/${this.props.match.params.id}`)
        .then(response => {
          console.log(response.data)
          this.setState({ restaurant: response.data.restaurant })
          console.log(response.data.restaurant)
        })
        .catch(() => this.props.alert({
          heading: 'Error',
          message: 'Something went wrong',
          variant: 'danger'
        }))
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
      axios({
        method: 'PATCH',
        url: `${apiUrl}/restaurants/${this.state.restaurant._id}`,
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          restaurant: this.state.restaurant
        }
      })
        .then(response => {
          this.props.alert({
            heading: 'Success!!!!',
            message: 'You updated a restaurant.',
            variant: 'success'
          })
          this.props.history.push(`/restaurants/${this.state.restaurant._id}`)
        })
        .catch(console.error)
    }

    render () {
      if (!this.state.restaurant) {
        return (
          <h1>Loading... </h1>
        )
      }
      return (
        <RestaurantForm
          restaurant={this.state.restaurant}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
}

export default withRouter(UpdateRestaurant)
