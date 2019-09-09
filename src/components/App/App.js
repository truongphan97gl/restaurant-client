import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import GuestLogin from '../GuestLogin/GuestLogin'

import ChangePassword from '../ChangePassword/ChangePassword'
import Restaurants from '../Restaurant/Restaurants'
import Restaurant from '../Restaurant/Restaurant'
import CreateRestaurant from '../Restaurant/CreateRestaurant'
import CreateComment from '../Restaurant/CreateComment'
import UpdateRestaurant from '../Restaurant/UpdateRestaurant'
import UpdateComment from '../Restaurant/UpdateComment'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          {/* <Route exact path="/" component={Restaurants} /> */}
          {/* <Route exact path="/restaurants" component={Restaurants} />
           */}
          <Route exact path="/" render={() => (
            <Restaurants user={user} alert={this.alert} />
          )} />
          <Route exact path="/restaurants" render={() => (
            <Restaurants user={user} alert={this.alert} />
          )} />
          <Route user={user} exact path='/restaurants/:id' render={({ match }) => (
            <Restaurant user={user} match={match} alert={this.alert}/>
          )} />
          {/* <AuthenticatedRoute user={user} exact path='/restaurants/:id' render={({ match }) => (
            <Restaurant user={user} match={match} alert={this.alert}/>
          )} /> */}
          <AuthenticatedRoute user={user} exact path='/restaurants/:id/edit' render={({ match }) => (
            <UpdateRestaurant alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/comments/:id/edit' render={({ match }) => (
            <UpdateComment alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute
            user={user}
            path="/create-restaurant"
            render={() => (
              <CreateRestaurant
                user={user}
                alert={this.alert}
              />
            )}
          />
          {/* Comment's part */}
          <AuthenticatedRoute
            user={user}
            path="/create-comment"
            render={() => (
              <CreateComment
                user={user}
                alert={this.alert}
              />
            )}
          />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/guest-login' render={() => {
            // const setUser = { email: 'guest@guest', password: 'guest' }
            return (
              <GuestLogin alert = { this.alert } setUser = {this.setUser} />
            )
          }} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

        </main>
      </Fragment>
    )
  }
}

export default App
