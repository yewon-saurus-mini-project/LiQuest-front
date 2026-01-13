import { fn } from 'storybook/test';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    mode: 0,
    label: "버튼",
    handleClick: fn(),
  },
};

export const Primary = {};

export const Warning = {
  args: {
    mode: 1,
    label: "경고",
  }
};

export const Danger = {
  args: {
    mode: 2,
    label: "위험",
  }
};

export const Cancle = {
  args: {
    mode: 3,
    label: "취소",
  }
};