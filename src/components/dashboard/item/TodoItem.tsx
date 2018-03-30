import * as React from 'react';

import { updateItem } from 'database/firebase';
interface Props {
  content: string;
  uniqueKey: string;
}
const TodoItem: React.SFC<Props> = props => (
  <li>
    <button onClick={() => updateItem(props.uniqueKey)}>update</button>
    {props.content}
  </li>
);

export default TodoItem;
