import InfoItem from "./InfoItem";

export default {
  title: "Pages/Info/InfoItem",
  component: InfoItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    iconSrc: "https://i.pravatar.cc/150",
    title: "InfoItem 제목",
    describe: "InfoItem 내용을 작성합니다.",
  },
};

export const ImageSrc = {};
