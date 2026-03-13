import ArticleList from "./ArticleList";
import { mockArticleListData } from "./ArticleList.mock";

export default {
  title: "pages/Board/ArticleList",
  component: ArticleList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    initialArticleData: mockArticleListData,
  },
};

export const Default = {};

export const EmptyList = {
  args: {
    initialArticleData: [],
  },
};
