import moment from 'moment';
import { filter } from 'lodash';

// 날짜별 데이터 필터링 함수
export const filterByDate = (items, standard) => {
  let filteredItems = [];
  let today = moment().add(0, 'days').format('YYYY-MM-DD');
  let week = moment().add(7, 'days').format('YYYY-MM-DD');

  if (standard === 'today') {
    // 지난 값과 오늘 값 filter
    filteredItems = filter(items, item => item.created_at <= today);
  } else if (standard === 'week') {
    filteredItems = filter(items, item => item.created_at <= week);
  }

  return filteredItems;
}