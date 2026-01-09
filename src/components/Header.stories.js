import { Header } from './';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    isLogin: false,
    username: ''
  },
};

export const LoggedOut = {
  args: {
    isLogin: false
  },
};

export const LoggedIn = {
  args: {
    isLogin: true,
    username: '사용자'
  },
};
