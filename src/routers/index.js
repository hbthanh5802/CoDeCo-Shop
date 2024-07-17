import ForgotPassword from '@/pages/AuthPage/ForgotPassword';
import Login from '@/pages/AuthPage/Login';
import Register from '@/pages/AuthPage/Register';
import Home from '@/pages/Home';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth/register',
    component: Register,
    layout: null,
  },
  {
    path: '/auth/login',
    component: Login,
    layout: null,
  },
  {
    path: '/auth/forgot-password',
    component: ForgotPassword,
    layout: null,
  },
];

export default routes;
