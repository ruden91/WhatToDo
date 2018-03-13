import React from 'react';

import TodoItem from 'containers/dashboard/TodoItem';

<<<<<<< HEAD
const TodayPanel = ({ todoItems, moveCard, activeTodoItem }) => (
=======
const TodayPanel = ({ todoItems, moveCard }) => (
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30
  <div>
    <h2>오늘</h2>
    <ul>
      {todoItems.filter((item, index) => index < 5).map((item, index) => (
<<<<<<< HEAD
        <TodoItem {...item} key={item.id} moveCard={moveCard} index={index} activeTodoItem={activeTodoItem} />
=======
        <TodoItem {...item} key={item.id} moveCard={moveCard} index={index} />
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30
      ))}
    </ul>
  </div>
);

export default TodayPanel;
