import OffersList from '../../components/offers-list/offers-list';
import { AppRoute, OfferCardType } from '../../const';
import { Header } from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const isNoFavoritesAvailable = useAppSelector((state) => state.isDoneFetchingFavoriteOffers && state.favoriteOffers.length === 0);
  return (
    <div className="page">
      <Header isActive={false}/>
      <main className={`page__main page__main--favorites ${isNoFavoritesAvailable ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`${isNoFavoritesAvailable ? 'favorites favorites--empty' : 'favorites'}`}>
            {
              isNoFavoritesAvailable ?
                <>
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">
                      Save properties to narrow down search or plan your future trips.
                    </p>
                  </div>
                </> :
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <OffersList offers={favoriteOffers} offerCardType={OfferCardType.Favorite} setActiveOffer={() => {}}/>
                </>
            }
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
