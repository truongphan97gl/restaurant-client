import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Card, CardText } from 'reactstrap'
const Comment = ({ com, user, handleDelete }) => {
  const commentJsx =
    <React.Fragment key={com._id}>
      <Card body outline color="secondary">
        <CardText>
          <p>{com.owner.email}: {com.text}</p>
          {user._id === com.owner._id ? <Button variant="danger" onClick={() => handleDelete(com._id, user)}>Delete</Button>
            : ''}
          <Link to={`/comments/${com._id}/edit`}>
            {user._id === com.owner._id ? <Button>Updated</Button> : ''}
          </Link>
        </CardText>

      </Card>

    </React.Fragment>
  return commentJsx
}

export default withRouter(Comment)
