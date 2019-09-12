import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ comment, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label class="white-front">Your comment on Restaurant: </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Your comment on the menu :"
        value={comment.text}
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

export default CommentForm
