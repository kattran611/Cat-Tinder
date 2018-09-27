import React, { Component } from 'react';
import { Header, Card, Image, Button, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import axios from 'axios'

class Home extends Component {

  state = { cats: [] }

  componentDidMount(){
    axios.get('/api/cats')
    .then( res => this.setState({ cats: res.data }))
    .catch( res => this.setState({ errors: res.data }))
  }

  sample = () => {
    if(this.state.cats.length) {
      const index = Math.floor(Math.random() * this.state.cats.length)
      return this.state.cats[index]
    } else {
      return null
    }
  }

  downVote = id => {
    let { cats } = this.state
    this.setState({ cats: cats.filter( single => {
      return single.id !== id
    })})
  }

  upVote = id => {
    let {cats} = this.state
    axios.put(`/api/cats/${id}`)
    .then( () => this.setState({ cats: cats.filter( c => c.id !== id)}))
  }

  render() {
    const cat = this.sample()
    if (cat){
      return(
        <div>
        <Card key={cat.id}>
          <Image src={cat.avatar}/>
          <Card.Content>
            <Card.Header>
              {cat.name}
            </Card.Header>
            <Card.Description>
              {cat.breed}
            </Card.Description>
            <Card.Meta>
              {cat.registry}
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Button basic onClick={() => this.downVote(cat.id)}>
              <Icon name = "thumbs down" />
            </Button>

            <Button basic onClick={() => this.upVote(cat.id)}>
              <Icon name = "thumbs up" />
            </Button>

          </Card.Content>
        </Card>
        <Link to="/the_cats_i_love">My Cats</Link>
        </div>
      )
    } else {
      return(
        <Header textAlign="center">No More Cats</Header>
      )
    }
  }
}

export default Home;
