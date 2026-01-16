import { fn } from 'storybook/test';

import { ConfirmPopup } from './';

export default {
  title: 'Components/ConfirmPopup',
  component: ConfirmPopup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onOpenAlert: fn(),
    onconfirm: fn(),
    title: "팝업 제목",
    message: "메세지 본문",
  },
};

export const Default = {
  args: {
    title: "로그아웃",
    message: "로그아웃 하시겠습니까?"
  },
};
