import { GoToLatestAndQuizList } from "./";
import { mockQuizData } from "./GoToLatestAndQuizList.mock";

export default {
  title: "Components/GoToLatestAndQuizList",
  component: GoToLatestAndQuizList,
  parameters: {
    layout: "fullscreen", // 스크롤 영역을 제대로 보기 위해 fullscreen으로 변경
  },
  tags: ["autodocs"],
  args: {
    initialQuizList: mockQuizData,
  },
};

export const EmptyList = {
  args: {
    initialQuizList: [],
  },
};

export const WithCompletedItems = {};
