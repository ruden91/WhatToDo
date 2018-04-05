import * as React from 'react';
import { createItem } from 'database/firebase';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import * as moment from 'moment';
import 'moment/locale/ko';
import './AddTodoItem.scss';
import ContentEditable from 'react-contenteditable';
interface State {
  content: string;
  selectDate: string | Object;
  toggleCalendar: boolean;
}
export default class AddTodoItem extends React.Component<{}, State> {
  state = {
    content: '',
    selectDate: new Date(),
    toggleCalendar: false
  };

  changeTodoItemContent = (e: any): void => {
    this.setState({ content: e.target.value });
  };
  selectDate = (selectDate: any) => {
    this.setState({
      selectDate: moment(selectDate).format('YYYY-MM-DD'),
      toggleCalendar: false
    });
  };
  handleCalendar = () => {
    this.setState({
      toggleCalendar: !this.state.toggleCalendar
    });
  };

  handleAddTodoForm = (e: any): void => {
    e.preventDefault();
    const { content, selectDate } = this.state;

    if (content === '') {
      return;
    }
    createItem(content, selectDate);

    this.setState({
      content: '',
      selectDate: new Date()
    });
  };
  render() {
    const { toggleCalendar, selectDate } = this.state;
    return (
      <div className="add-todo-item">
        <form onSubmit={this.handleAddTodoForm}>
          <table className="add-todo-item__input-actions">
            <tbody>
              <tr>
                <td>
                  <ContentEditable
                    html={this.state.content} // innerHTML of the editable div
                    disabled={false} // use true to disable edition
                    onChange={this.changeTodoItemContent} // handle innerHTML change
                  />
                </td>
                <td>
                  <button onClick={this.handleCalendar}>
                    {moment(selectDate).format('YYYY-MM-DD')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="add-todo-item__actions">
            <tbody>
              <tr>
                <td>
                  <button type="submit" className="add-todo-item__add-item">
                    작업 추가
                  </button>
                </td>
                <td>
                  <a href="javascript:;" className="add-todo-item__cancel-item">
                    취소
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {toggleCalendar && (
          <InfiniteCalendar
            width={300}
            selected={selectDate}
            height={400}
            onSelect={this.selectDate}
          />
        )}
      </div>
    );
  }
}
