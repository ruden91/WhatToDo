import { uniqueId } from 'lodash';
import moment from 'moment';

export const todoItems = () => {
  return [
    {
      title: '中 대북 지원·日 대화 지지 유도… 韓 중재자 역할 커진다',
      id: uniqueId(),
      created_at: moment()
        .add(8, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '미국, 호주도 철강 관세 면제…한국 세이프가드는 철회 안 해',
      id: uniqueId(),
      created_at: moment()
        .add(0, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '탈취제서 가습기 살균제 성분 검출…판매금지 조치도 엉망',
      id: uniqueId(),
      created_at: moment()
        .add(-1, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '벌어진 일교차 감기 조심…낮 서울 14도·대구 19도',
      id: uniqueId(),
      created_at: moment()
        .add(-1, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '정의당, 평화당과 공동교섭단체 꾸린다',
      id: uniqueId(),
      created_at: moment()
        .add(-2, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '해명했지만… 논란 커지는 금감원장 채용청탁 의혹',
      id: uniqueId(),
      created_at: moment()
        .add(-3, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '정의당, 평화당과 공동교섭단체 꾸린다',
      id: uniqueId(),
      created_at: moment()
        .add(-3, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '정의당, 의원총회서 평화당과 교섭단체 적극 추진키로',
      id: uniqueId(),
      created_at: moment()
        .add(-4, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: '안희정 재조사 불가피...이르면 주후반 소환',
      id: uniqueId(),
      created_at: moment()
        .add(-7, 'days')
        .format('YYYY-MM-DD'),
      active: false
    },
    {
      title: 'MB 뇌물 구조 마지막 퍼즐 맞추기...핵심 측근 잇따라 소환',
      id: uniqueId(),
      created_at: moment()
        .add(-10, 'days')
        .format('YYYY-MM-DD'),
      active: false
    }
  ];
};
