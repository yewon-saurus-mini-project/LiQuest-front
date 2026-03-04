import { fn } from 'storybook/test';

import LoginPage from './LoginPage';

export default {
  title: 'Pages/Account/LoginPage/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    setIsLogin: fn(),
  },
};

export const Default = {};
