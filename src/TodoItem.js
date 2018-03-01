import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li>
        { item.text }
      </li>
    )
  }
}

export default TodoItem;