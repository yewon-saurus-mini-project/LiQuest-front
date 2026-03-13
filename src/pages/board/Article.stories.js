import Article from "./Article";
import { mockArticleData } from "./Article.mock";

export default {
  title: "pages/Board/Article",
  component: Article,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    initialArticleData: mockArticleData,
  },
};

export const Default = {};
