import * as React from "react";
import { createItem, updateItemContent } from "database/firebase";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";
import * as moment from "moment";
import "moment/locale/ko";
import "./AddTodoItem.scss";
import ContentEditable from "react-contenteditable";
import { find } from "lodash";

interface Props {
  onHandleAddTodoItem: (tabIndex: number, index: number) => void;
  realDate: {} | null;
  item?: any;
  index?: string;
  filter: string;
  projects: any[];
}
interface State {
  content: string;
  selectDate: string | Object;
  toggleCalendar: boolean;
  toggleHashItems: boolean;
}
export default class AddTodoItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    content: "",
    selectDate: new Date(),
    toggleCalendar: false,
    toggleHashItems: false
  };

  changeTodoItemContent = (e: any): void => {
    this.setState({ content: e.target.value });
  };
  handleHashCode = (e: any): void => {
    // keycode hash
    if (e.which === 35) {
      this.setState({
        toggleHashItems: true
      });
    }

    // space
    if (e.which === 32) {
      this.setState({
        toggleHashItems: false
      });
    }
  };

  handleBackspace = (e: any): void => {
    if (e.which === 8) {
      if (this.state.content.slice(-1) === "#") {
        this.setState({
          toggleHashItems: false
        });
      }
    }
  };
  selectDate = (selectDate: any) => {
    this.setState({
      selectDate,
      toggleCalendar: !this.state.toggleCalendar
    });
  };

  handleCalendar = (e: any) => {
    e.preventDefault();
    this.setState({
      toggleCalendar: !this.state.toggleCalendar
    });
  };

  handleAddTodoForm = (e: any): void => {
    e.preventDefault();
    const { content, selectDate } = this.state;
    const { item, projects, filter, index, onHandleAddTodoItem } = this.props;
    const refinedSelectDate = moment(selectDate).format("YYYY-MM-DD");

    const projectIndex = find(projects, { name: filter })
      ? find(projects, { name: filter }).filterIndex
      : null;

    if (content === "") {
      return;
    }
    if (item && index) {
      updateItemContent(index, content, refinedSelectDate);
      onHandleAddTodoItem(-1, -1);
    } else {
      console.log(this.props);
      createItem(content, refinedSelectDate, projectIndex);

      this.setState({
        content: ""
      });
    }
  };
  componentDidMount() {
    const { item } = this.props;

    // item이 있는 경우 update, 없다면 create
    if (item) {
      this.setState({
        selectDate: item.due,
        content: item.content
      });
    } else {
      if (!this.props.realDate) {
        this.setState({
          selectDate: new Date()
        });
      } else {
        this.setState({
          selectDate: this.props.realDate
        });
      }
    }
  }
  render() {
    const { toggleHashItems, toggleCalendar, selectDate } = this.state;
    const { item, onHandleAddTodoItem } = this.props;
    const hasItem = !!item;

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
                    onKeyPress={this.handleHashCode}
                    onKeyDown={this.handleBackspace}
                  />
                </td>
                <td>
                  <button onClick={this.handleCalendar}>
                    {moment(selectDate).format("YYYY-MM-DD")}
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
                    {hasItem ? "업데이트" : "작업 추가"}
                  </button>
                </td>
                <td>
                  <a
                    href="javascript:;"
                    className="add-todo-item__cancel-item"
                    onClick={() => onHandleAddTodoItem(-1, -1)}
                  >
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
            height={280}
            onSelect={this.selectDate}
            rowHeight={42}
            className="add-todo-item__calendar"
          />
        )}
        {toggleHashItems && (
          <div>
            <ul className="add-todo-item__hash-items">
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">쇼핑</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">심부름</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">일</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">개인</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">쇼핑</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">쇼핑</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">심부름</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">일</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">개인</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">쇼핑</span>
              </li>
              <li className="add-todo-item__hash-item">
                <span className="add-todo-item__hash-items-color" />
                <span className="add-todo-item__hash-items-name">쇼핑</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
