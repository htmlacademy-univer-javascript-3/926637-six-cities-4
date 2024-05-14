import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import OffersList from '../../components/offers-list/offers-list';
import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';
import React from 'react';

type FavoritesPageProps = {
  offers: Offer[];
};

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);
  if (activeOffer !== null){
    activeOffer.isFavorite = !!activeOffer.isFavorite; // Pass linter
  }
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={'/#'}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OffersList offers={offers} offerCardType={OfferCardType.Favorite} setActiveOffer={setActiveOffer}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
