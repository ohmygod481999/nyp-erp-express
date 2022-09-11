import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import GalleryRoute from './routes/gallery.route';
import OAuthRoute from './routes/oauth.route';
import OrderRoute from './routes/order.route';
import ProductRoute from './routes/product.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductRoute(),
  new GalleryRoute(),
  new OAuthRoute(),
  new OrderRoute(),
]);

app.listen();
