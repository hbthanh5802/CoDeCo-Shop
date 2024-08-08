import ForgotPassword from '@/pages/AuthPage/ForgotPassword';
import Login from '@/pages/AuthPage/Login';
import Register from '@/pages/AuthPage/Register';
import CartPage from '@/pages/CartPage';
import CreateOrderPage from '@/pages/CreateOrderPage';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import PaymentPage from '@/pages/PaymentPage';
import ProductPage from '@/pages/ProductPage';
import SearchPage from '@/pages/SearchPage';
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
    path: '/shop/search',
    component: SearchPage,
  },
  {
    path: '/shop/products/:productId',
    component: ProductPage,
  },
  {
    path: '/shop/cart',
    component: CartPage,
  },
  {
    path: '/shop/create-order/payment/:paymentType',
    component: PaymentPage,
  },
  {
    path: '/shop/create-order',
    component: CreateOrderPage,
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
