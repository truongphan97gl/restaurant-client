import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

class GuestLogin extends Component {
  constructor () {
    super()
    this.state = {
      email: 'guest@guest',
      password: 'guest'
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  // onSignIn = event => {
  componentDidMount () {
    const { alert, history, setUser } = this.props
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(() => {
        alert({
          heading: 'Sign In Failed',
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    return ''
  }
}

export default withRouter(GuestLogin)
