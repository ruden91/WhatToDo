import React, { Component } from 'react';
import TodoItem from 'components/dashboard/TodoItem';
import * as data from 'api/data';

import update from 'react-addons-update';

class InboxPanel extends Component {
  constructor() {
    super();

    this.state = {
      items: data.todoItems()
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { items } = this.state;
    const dragCard = items[dragIndex];

    this.setState(
      update(this.state, {
        items: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h2>Inbox</h2>

        <ul>
          {items.map((item, index) => {
            return <TodoItem { ...item } index={index} key={parseInt(item.id)} moveCard={ this.moveCard } />;
          })}
        </ul>
      </div>
    )
  }
}

export default InboxPanel;