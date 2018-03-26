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
  items: {},
  date: number
): number => {
  let copiedItems = assign({}, filterCompletedItem(items));
  let filterBy = moment()
    .add(date, 'days')
    .format();

  return filter(copiedItems, (item: any) => {
    if (item.due) {
      if (moment(item.due).format() === filterBy) {
        return item;
      }
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
