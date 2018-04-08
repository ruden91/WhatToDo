import * as React from 'react';

import TodoList from 'containers/dashboard/item/TodoList';
import * as moment from 'moment';
import { map } from 'lodash';
interface Props {
  items: any;
  filter: string;
}
export default class TodoItemsContainer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  mapToComponent = () => {
    const { items, filter } = this.props;
    let result = [];
    if (filter === 'today') {
      result = this.sortByDate(items, 1);
    } else if (filter === 'inbox') {
      result = [
        {
          items,
          showButton: true
        }
      ];
    } else if (filter === 'days') {
      result = this.sortByDate(items, 7);
    }
    return result.map((item: any, index: number) => (
      <TodoList
        items={item.items}
        title={item.title}
        date={item.date}
        showButton={item.showButton}
        key={index}
      />
    ));
  };

  sortByDate = (items: any, count: number) => {
    let today = moment()
      .add(0, 'days')
      .format('YYYY-MM-DD');
    let results: any = [];

    // 지난값 세팅
    results.push({
      title: '기한이 지난',
      date: null,
      items: {},
      showButton: false
    });

    // 지난값은 디폴트로 넣어준다.
    map(items, (item, key) => {
      // 지난 값 체크
      if (moment(item.due).format('YYYY-MM-DD') < today) {
        results[0].items[key] = item;
      }
    });

    for (let i = 0; i < count; i++) {
      let date;
      let title;
      if (i === 0) {
        title = '오늘';
        date = moment()
          .add(i, 'days')
          .format('dddd MM월 DD일');
      } else if (i === 1) {
        title = '내일';
        date = moment()
          .add(i, 'days')
          .format('dddd MM월 DD일');
      } else {
        title = moment()
          .add(i, 'days')
          .format('dddd');
        date = moment()
          .add(i, 'days')
          .format('MM월 DD일');
      }

      results.push({
        title,
        date,
        items: {},
        showButton: true
      });

      map(items, (item, key) => {
        if (
          moment(item.due).format('YYYY-MM-DD') ===
          moment()
            .add(i, 'days')
            .format('YYYY-MM-DD')
        ) {
          results[i + 1].items[key] = item;
        }
      });
    }

    return results;
  };

  render() {
    return <div>{this.mapToComponent()}</div>;
  }
}
