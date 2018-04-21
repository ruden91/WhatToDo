import * as moment from "moment";
import "moment/locale/ko";
import { filter, size, map } from "lodash";

/**
 * 아이템 리스트에서 date를 기준으로 완료된 목록의 count를 return해주는 함수
 *
 * @param {Array} items
 * @param {number} date
 * @return {number} count
 */
export const calculateDailyCompletedItems = (items: any[]): number => {
  let filterBy = moment()
    .add(0, "days")
    .format("YYYY-MM-DD");

  return size(
    filter(
      items,
      (item: any) => moment(item.completed_at).format("YYYY-MM-DD") === filterBy
    )
  );
};

/**
 * 아이템 리스트에서 date를 기준으로 완료되지 않은 목록의 count를 return해주는 함수
 *
 * @param {Array} items
 * @param {number} date
 * @return {number} count
 */
export const calculateItemsCount = (items: any[], date: number): number => {
  let filterBy = moment()
    .add(date, "days")
    .format();

  return size(
    filter(
      filterNotCompletedItem(items),
      item => moment(item.due).format() <= filterBy
    )
  );
};

/**
 * 아이템 리스트에서 완료되지 않은 목록만 필터링 해주는 함수
 *
 * @param {Array} items
 * @return {Array} filtered items
 */
export const filterNotCompletedItem = (items: any[]): any[] => {
  return filter(items, item => !item.is_completed);
};

/**
 * 완료되지 않은 목록 갯수를 구해주는 함수
 *
 * @param {Array} items
 * @return {number} count
 */
export const calculateNotCompletedItemsCount = (items: any[]): number => {
  return size(filterNotCompletedItem(items));
};

/**
 * 아이템 리스트에서 완료된 목록만 필터링 해주는 함수
 *
 * @param {Array} items
 * @return {Array} filtered items
 */
export const filterCompletedItem = (items: any[]): any[] => {
  return filter(items, item => item.is_completed);
};

/**
 * 완료된 목록 갯수를 구해주는 함수
 *
 * @param {Array} items
 * @return {number} count
 */
export const calculateCompletedItemsCount = (items: any[]): number => {
  return size(filterCompletedItem(items));
};

/**
 * todoItems를 활용해서 주간 데이터 양식을 만들어주는 함수 (최근 5일)
 *
 * @param {Array} items
 * @return {Array} weeklyStats
 */
export const makeWeeklyStats = (items: any[]): Object => {
  let completedItems = filterCompletedItem(items);
  let results: any = [];
  // 지난 7일 dataSet 세팅
  for (let i = 0; i < 7; i++) {
    results.push({
      day: moment()
        .add(0 - i, "days")
        .format("ddd"),
      count: 0
    });
  }

  map(completedItems, (item: any, key) => {
    let day = moment(item.completed_at).format("ddd");
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
): any[] => {
  let filteredItem = filterNotCompletedItem(items);

  if (standard === "inbox") {
    return filteredItem;
  } else if (standard === "today") {
    return filterItemsByDate(filteredItem);
  } else if (standard === "days") {
    return filterItemsByDate(filteredItem, 6);
  }

  return filteredItem;
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
export const filterItemsByDate = (items: any, date: number = 0): any[] => {
  let filterBy = moment()
    .add(date, "days")
    .format();

  return filter(items, item => item.due <= filterBy);
};

// 프로젝트 기준 데이터 필터링
export const filterItemsByProject = () => {};

// 라벨 기준 데이터 필터링
export const filterItemsByLabel = () => {};

// 필터 기준 데이터 필터링
export const filterItemsByFilter = () => {};
