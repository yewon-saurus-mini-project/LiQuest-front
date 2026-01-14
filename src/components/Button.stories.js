import { fn } from 'storybook/test';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    children: "버튼",
    mode: "primary",
    onClick: fn(),
    isLong: false,
  },
};

export const Primary = {};

export const Warning = {
  args: {
    children: "경고",
    mode: "warning",
  }
};

export const Danger = {
  args: {
    children: "위험",
    mode: "danger",
  }
};

export const Cancle = {
  args: {
    children: "취소",
    mode: "cancle",
  }
};

export const Long = {
  args: {
    isLong: true,
  }
}