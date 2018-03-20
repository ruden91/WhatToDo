import moment from 'moment';
import { filter } from 'lodash';

// 날짜별 데이터 필터링 함수
export const filterByDate = (items, standard = 0) => {
  if (typeof standard !== 'number') {
    return [];
  }
  let date = moment().add(standard, 'days').format('YYYY-MM-DD');

  return filterByComplete(filter(items, item => moment(item.due).format('YYYY-MM-DD') <= date)).length;
}

// 완료목록 제외 함수
export const filterByComplete = (items) => {
  return filter(items, item => !item.is_completed);
}