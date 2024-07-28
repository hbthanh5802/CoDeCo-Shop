import ForgotPassword from '@/pages/AuthPage/ForgotPassword';
import Login from '@/pages/AuthPage/Login';
import Register from '@/pages/AuthPage/Register';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import Shop from '@/pages/Shop';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/shop',
    component: Shop,
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
  {
    path: '*',
    component: NotFound,
    // layout: null,
  },
];

export default routes;
