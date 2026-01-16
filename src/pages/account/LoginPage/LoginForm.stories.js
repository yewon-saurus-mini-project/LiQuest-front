import { fn } from 'storybook/test';

import LoginForm from './LoginForm';

export default {
  title: 'Pages/Account/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    setIsLogin: fn(),
  },
};

export const Default = {};
