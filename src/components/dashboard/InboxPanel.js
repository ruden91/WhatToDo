import React, { Component } from 'react';

import TodoItem from 'containers/dashboard/TodoItem';

class InboxPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
<<<<<<< HEAD
    const { todoItems, moveCard, activeTodoItem } = this.props;
=======
    const { todoItems, moveCard } = this.props;
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30
    return (
      <div>
        <h2>Inbox</h2>
        <ul>
<<<<<<< HEAD
          {todoItems.map((item, index) => (
            <TodoItem {...item} key={item.id} moveCard={moveCard} index={index} activeTodoItem={activeTodoItem}/>
=======
          {todoItems.filter((item, index) => index < 3).map((item, index) => (
            <TodoItem {...item} key={item.id} moveCard={moveCard} index={index} />
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30
          ))}
        </ul>
      </div>
    );
  }
}

export default InboxPanel;
