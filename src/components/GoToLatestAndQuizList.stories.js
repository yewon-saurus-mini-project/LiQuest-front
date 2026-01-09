import { GoToLatestAndQuizList } from './';

const mockQuizData = [
  {
    "quiz_id": 4,
    "word": "영민하다",
    "meaning": "매우 영특하고 민첩하다.",
    "solved_date": null,
    "username": ""
  },
  {
    "quiz_id": 3,
    "word": "탁월하다",
    "meaning": "남보다 두드러지게 뛰어나다.",
    "solved_date": null,
    "username": ""
  },
  {
    "quiz_id": 2,
    "word": "영민하다",
    "meaning": "매우 영특하고 민첩하다.",
    "solved_date": null,
    "username": ""
  },
  {
    "quiz_id": 1,
    "word": "공급하다",
    "meaning": "요구나 필요에 따라 물품 따위를 제공함",
    "solved_date": "2024-05-15T23:55:08+09:00",
    "username": ""
  }
];

export default {
  title: 'Components/GoToLatestAndQuizList',
  component: GoToLatestAndQuizList,
  parameters: {
    layout: 'fullscreen', // 스크롤 영역을 제대로 보기 위해 fullscreen으로 변경
  },
  tags: ['autodocs'],
  args: {
    initialQuizList: mockQuizData
  },
};

export const EmptyList = {
  args: {
    initialQuizList: []
  }
};

export const WithCompletedItems = {};
