import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Card from 'react-bootstrap/Card'
// import ListGroupItem from 'react-bootstrap/ListGroupItem'
// import ListGroup from 'react-bootstrap/ListGroup'
import {
  Card, CardImg, CardTitle, CardDeck,
  CardBody, CardFooter
} from 'reactstrap'

// import Button from 'react-bootstrap/Button'

// import Form from 'react-bootstrap/Form'

// import Button from 'react-bootstrap/Button'

class Restaurants extends Component {
  // constructor method!!!!
  constructor (props) {
    // need to call super
    super(props)

    this.state = {
      restaurants: []
    }
  }

  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/restaurants`)
      this.setState({ restaurants: response.data.restaurants })
    } catch (error) {
      this.props.alert({
        heading: 'Failure!!!!',
        message: 'Failure to do action',
        variant: 'warning'
      })
    }
  }

  // render method!!!!!
  render () {
    // const restaurantsJsx = this.state.restaurants.map(restaurant => (
    //   <React.Fragment key={restaurant._id} >
    //     <Card className="text-center mt-4 " style={{ width: '18rem' }}>
    //       <Card.Img variant="top" src="https://img.icons8.com/ios-filled/100/000000/camera.png" />
    //       <Card.Body>
    //         <Link to={`/restaurants/${restaurant._id}`}>
    //           {/* {restaurant._id} */}
    //           <Card.Title>{restaurant.title}</Card.Title>
    //         </Link>

    //         <Card.Text>
    //         </Card.Text>
    //       </Card.Body>
    //       <ListGroup className="list-group-flush">
    //         <ListGroupItem>Like: {restaurant.likes.length}</ListGroupItem>
    //       </ListGroup>
    //     </Card>
    //   </React.Fragment>
    // ))

    const restaurantsJsx = this.state.restaurants.map(restaurant => (
      <React.Fragment key={restaurant._id} >
        <CardDeck>
          <Card>
            <Link to={`/restaurants/${restaurant._id}`}>
              <div id="logo">
                <CardImg top width="100%" src="https://www.justlifelogo.com/wp-content/uploads/2016/09/food-love-restaurant-logo-for-sale.jpg" alt="Card image cap" />
              </div>
            </Link>
            <CardBody>
              <Link to={`/restaurants/${restaurant._id}`}>
                <CardTitle className="text-center">
                  <h1>
                    {restaurant.title}
a                  </h1>
                </CardTitle>
              </Link>
              <CardFooter className="text-center">Like: {restaurant.likes.length}</CardFooter>
            </CardBody>
          </Card>
        </CardDeck>
      </React.Fragment>
    ))
    // let createButton = ''

    // if (this.props.user) {
    //   createButton = <Link to={'/create-restaurant'}>
    //     <Button>Create your restauraunt</Button>
    //   </Link>
    // }
    return (
      <div className="row d-flex justify-content-center">
        { restaurantsJsx }
        {/* {createButton} */}
      </div>
    )
  }
}

export default Restaurants
