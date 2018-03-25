import * as moment from 'moment';
import { filter, assign, size } from 'lodash';

/**
 * 아이템 리스트에서 date를 기준으로 count를 return해주는 함수
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
        console.log(moment(item.due).format('YYYY-MM-DD'));
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
