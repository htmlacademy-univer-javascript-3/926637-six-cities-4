import MainPage from '../../pages/main/main';
import {AppRoute, AuthStatus} from '../../const';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import FavoritesPage from '../../pages/favorites/favorites';
import OfferPage from '../../pages/offer/offer';
import NotFoundPage from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {Comment} from '../../types/comment';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

type AppProps = {
  comments: Comment[];
};

function App ({comments}: AppProps): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage comments={comments}/>}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
