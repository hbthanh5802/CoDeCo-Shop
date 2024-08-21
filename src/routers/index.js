import ForgotPassword from '@/pages/AuthPage/ForgotPassword';
import Login from '@/pages/AuthPage/Login';
import OAuthPage from '@/pages/AuthPage/OAuthPage';
import Register from '@/pages/AuthPage/Register';
import VerifyLink from '@/pages/AuthPage/components/VerifyLink';
import CartPage from '@/pages/CartPage';
import CreateOrderPage from '@/pages/CreateOrderPage';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import PaymentPage from '@/pages/PaymentPage';
import ProductPage from '@/pages/ProductPage';
import SearchPage from '@/pages/SearchPage';
import Shop from '@/pages/Shop';
import VoucherPage from '@/pages/VoucherPage';

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
    path: '/shop/vouchers',
    component: VoucherPage,
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
    path: '/payment/:paymentType',
    component: PaymentPage,
    layout: null,
  },
  {
    path: '/shop/create-order',
    component: CreateOrderPage,
  },
  {
    path: '/verify',
    component: VerifyLink,
    layout: null,
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
    path: '/authenticate/oauth',
    component: OAuthPage,
    layout: null,
  },
  {
    path: '*',
    component: NotFound,
    // layout: null,
  },
];

export default routes;
