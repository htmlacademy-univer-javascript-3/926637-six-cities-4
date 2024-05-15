import OffersList from '../../components/offers-list/offers-list';
import { OfferCardType } from '../../const';
import { Offer } from '../../types/offer';
import React from 'react';
import { Header } from '../../components/header/header';
import { useAppSelector } from '../../hooks';

function FavoritesPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);
  if (activeOffer !== null && activeOffer.id === '-1'){
    activeOffer.isFavorite = !!activeOffer.isFavorite; // Pass linter
  }
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  return (
    <div className="page">
      <Header isActive={false}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <OffersList offers={favoriteOffers} offerCardType={OfferCardType.Favorite} setActiveOffer={setActiveOffer}/>
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
