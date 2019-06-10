import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { 
  Container, 
  ListGroup, 
  ListGroupItem, 
  Button 
} from 'reactstrap'

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getItems()
  }
  
  deleteItem = id => this.props.deleteItem(id)

  render() {
    const { items } = this.props
    
    const itemsList = items.map(({_id, name}) => (
      <CSSTransition key={_id} timeout={300} classNames="fade">
        <ListGroupItem>
          <Button
            className="remove-btn"
            color="danger"
            size="sm"
            onClick={() => this.deleteItem(_id)}
          >
            X 
          </Button>
          {name}
        </ListGroupItem>
      </CSSTransition>
    ))

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {itemsList}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  items: state.item.items
})

const mapDispatchToProps = {
  getItems,
  deleteItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)