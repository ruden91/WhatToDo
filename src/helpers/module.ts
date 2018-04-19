import * as moment from 'moment';
import 'moment/locale/ko';
import { filter, assign, size, map } from 'lodash';

/**
 * 아이템 리스트에서 date를 기준으로 완료된 목록의 count를 return해주는 함수
 *
 * @param {Object} items
 * @param {number} date
 * @return {number} count
 */
export const calculateDailyCompletedItems = (
  items: {}
): number => {
  let copiedItems = assign({}, filterCompletedItem(items));
  let filterBy = moment()
    .add(0, 'days')
    .format('YYYY-MM-DD');
  
  return filter(copiedItems, (item: any) => {
    if (moment(item.completed_at).format('YYYY-MM-DD') === filterBy) {
      return item;
    }
  }).length;
};

/**
 * 아이템 리스트에서 date를 기준으로 완료되지 않은 목록의 count를 return해주는 함수
 *
 * @param {Object} items
 * @param {number} date
 * @return {number} count
 */
export const calculateItemsCount = (items: {}, date: number): number => {
  let copiedItems = assign({}, filterNotCompletedItem(items));
  let filterBy = moment()
    .add(date, 'days')
    .format();

  return filter(copiedItems, (item: any) => {
    if (item.due) {
      if (moment(item.due).format() <= filterBy) {
        return item;
      }
    }
  }).length;
};

/**
 * 아이템 리스트에서 완료되지 않은 목록만 필터링 해주는 함수
 *
 * @param {Object} items
 * @return {Object} filtered items
 */
export const filterNotCompletedItem = (items: {}): Object => {
  let copiedItems = assign({}, items);
  let tempObj = {};

  // is_completed 필드가 true인 경우에 임시 object에 저장한다.
  filter(copiedItems, (item, key) => {
    if (!item.is_completed) {
      tempObj[key] = {
        ...item
      };
    }
    return item;
  });

  return tempObj;
};

/**
 * 완료되지 않은 목록 갯수를 구해주는 함수
 *
 * @param {Object} items
 * @return {number} count
 */
export const calculateNotCompletedItemsCount = (items: {}): number => {
  let copiedItems = assign({}, items);

  // object length를 구하기 위해 lodash size메소드 사용
  return size(filterNotCompletedItem(copiedItems));
};

/**
 * 아이템 리스트에서 완료된 목록만 필터링 해주는 함수
 *
 * @param {Object} items
 * @return {Object} filtered items
 */
export const filterCompletedItem = (items: {}): Object => {
  let copiedItems = assign({}, items);
  let tempObj = {};

  // is_completed 필드가 true인 경우에 임시 object에 저장한다.
  filter(copiedItems, (item, key) => {
    if (item.is_completed) {
      tempObj[key] = {
        ...item
      };
    }
    return item;
  });

  return tempObj;
};

/**
 * 완료된 목록 갯수를 구해주는 함수
 *
 * @param {Object} items
 * @return {number} count
 */
export const calculateCompletedItemsCount = (items: {}): number => {
  let copiedItems = assign({}, items);
  return size(filterCompletedItem(copiedItems));
};

/**
 * todoItems를 활용해서 주간 데이터 양식을 만들어주는 함수 (최근 5일)
 *
 * @param {Object} items
 * @return {Array} weeklyStats
 */
export const makeWeeklyStats = (items: {}): Object => {
  let completedItems = filterCompletedItem(items);
  let results: any = [];
  // 지난 7일 dataSet 세팅
  for (let i = 0; i < 7; i++) {
    results.push({
      day: moment()
        .add(0 - i, 'days')
        .format('ddd'),
      count: 0
    });
  }

  map(completedItems, (item: any, key) => {
    let day = moment(item.completed_at).format('ddd');
    map(results, result => {
      if (result.day === day) {
        result.count++;
      }
    });
  });

  return results;
};

export const filterItemsBySpecificStandard = (
  items: any,
  standard: string
): Object => {
  // 완료되지 않은 raw 데이터
  let copiedItems = assign({}, filterNotCompletedItem(items));
  if (standard === 'inbox') {
    return copiedItems;
  } else if (standard === 'today') {
    return filterItemsByDate(copiedItems);
  } else if (standard === 'days') {
    return filterItemsByDate(copiedItems, 6);
  }

  return copiedItems;
};

// // 날짜 기준 데이터 필터링
// export const filterItemsByDate = (items: any, count: number): Object => {
//   let today = moment()
//     .add(0, 'days')
//     .format('YYYY-MM-DD');
//   let results: any = [];

//   // 지난값 세팅
//   results.push({
//     title: '기한이 지난',
//     date: null,
//     items: {}
//   });

//   // 지난값은 디폴트로 넣어준다.
//   map(items, (item, key) => {
//     // 지난 값 체크
//     if (moment(item.due).format('YYYY-MM-DD') < today) {
//       results[0].items[key] = item;
//     }
//   });

//   for (let i = 0; i < count; i++) {
//     let date;
//     let title;
//     if (i === 0) {
//       title = '오늘';
//       date = moment()
//         .add(i, 'days')
//         .format('dddd MM월 DD일');
//     } else if (i === 1) {
//       title = '내일';
//       date = moment()
//         .add(i, 'days')
//         .format('dddd MM월 DD일');
//     } else {
//       title = moment()
//         .add(i, 'days')
//         .format('dddd');
//       date = moment()
//         .add(i, 'days')
//         .format('MM월 DD일');
//     }

//     results.push({
//       title,
//       date,
//       items: {}
//     });

//     map(items, (item, key) => {
//       if (
//         moment(item.due).format('YYYY-MM-DD') ===
//         moment()
//           .add(i, 'days')
//           .format('YYYY-MM-DD')
//       ) {
//         results[i + 1].items[key] = item;
//       }
//     });
//   }

//   return results;
// };

// 특정 날짜 기준 데이터 필터링
export const filterItemsByDate = (items: any, date: number = 0): Object => {
  let copiedItems = assign({}, items);
  let results = {};
  let filterBy = moment()
    .add(date, 'days')
    .format();

  filter(copiedItems, (item, key) => {
    if (item.due <= filterBy) {
      results[key] = item;
    }
  });
  return results;
};

// 프로젝트 기준 데이터 필터링
export const filterItemsByProject = () => {};

// 라벨 기준 데이터 필터링
export const filterItemsByLabel = () => {};

// 필터 기준 데이터 필터링
export const filterItemsByFilter = () => {};
