import NoticeDetail from "./NoticeDetail";
import { mockNoticeData } from "./NoticeDetail.mock";

export default {
  title: "pages/Notice/NoticeDetail",
  component: NoticeDetail,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    initialNoticeData: mockNoticeData,
  },
};

export const Default = {};
