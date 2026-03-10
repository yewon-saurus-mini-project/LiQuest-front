import UserProfileView from "./UserProfileView";

export default {
  title: "pages/Board/UserProfileView",
  component: UserProfileView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    profile: {
      user_level: 12,
      introduction: "안녕하세요!",
      image: "https://i.pravatar.cc/150",
    },
  },
};

export const Loaded = {};

export const Loading = {
  args: { profile: null },
};
