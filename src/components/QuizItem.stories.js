import { QuizItem } from './';

export default {
  title: 'Components/QuizItem',
  component: QuizItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    data: {
      quiz_id: 1,
      solved_date: null,
      word: "안녕하다"
    }
  },
};

export const IncompleteItem = {};

export const CompletedItem = {
  args: {
    data: {
      quiz_id: 2,
      solved_date: "(date)",
      word: "끝나다"
    }
  }
};
