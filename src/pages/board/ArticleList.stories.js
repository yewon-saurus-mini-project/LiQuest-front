import ArticleList from "./ArticleList";
import { mockArticleData } from "./ArticleList.mock";

export default {
  title: "pages/Board/ArticleList",
  component: ArticleList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    initialArticleData: mockArticleData,
  },
};

export const Default = {};

export const EmptyList = {
  args: {
    initialArticleData: [],
  },
};
