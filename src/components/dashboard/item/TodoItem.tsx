import * as React from 'react';

interface Props {
  content: string;
}
const TodoItem: React.SFC<Props> = props => <li>{props.content}</li>;

export default TodoItem;
