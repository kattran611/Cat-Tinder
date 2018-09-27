import React from 'react'
import {
  Card,
  Image,
  Divider
} from 'semantic-ui-react'
import axios from 'axios'

export default class MyCats extends React.Component {

  state = { cats: [] }

  componentDidMount(){
    axios.get('/api/my_cats')
    .then( res => {
      this.setState({ cats: res.data })
    })
  }

  //TODO Demo componentDidUpdate

  render(){
    return(
      <Card.Group itemsPerRow={4}>
        { this.state.cats.map( cat =>
          <Card key={cat.id}>
            <Card.Content>
              <Image src={cat.avatar} />
              <Divider/>
              <Card.Header>
                {cat.name}
              </Card.Header>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    )
  }
}
