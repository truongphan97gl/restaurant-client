import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RestaurantForm = ({ restaurant, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Restaurant name :</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the restaurant's name :"
        value={restaurant.title}
        onChange={handleChange}
        name="title"
        required
      />
    </Form.Group>

    <Form.Group controlId="text">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the description"
        value={restaurant.text}
        onChange={handleChange}
        name="text"
        required
      />
    </Form.Group>
    <Button variant="primary" type="submit">
            Submit
    </Button>
  </Form>
)

export default RestaurantForm
