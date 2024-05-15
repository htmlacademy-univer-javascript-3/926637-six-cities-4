import Logo from '../../components/logo/logo';
import { Offer } from '../../types/offer';
import OffersList from '../../components/offers-list/offers-list';
import { CityToOffer, OfferCardType } from '../../const';
import React, { useEffect } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OffersSortingForm from '../../components/offers-sorting-form/offers-sorting-form';
import { fetchOffers } from '../../store/api-actions';
import Loading from '../../components/loading/loading';

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);
  const offers = useAppSelector((state) => state.currentOffers);
  const city = useAppSelector((state) => state.city);
  const isDoneFetchingOffers = useAppSelector((state) => state.isDoneFetchingOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [city]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isActive/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              {
                isDoneFetchingOffers ? <>
                  <b className="places__found">
                    {offers.length} places to stay in {city.toString()}
                  </b>
                  <OffersSortingForm/>
                  <OffersList offers={offers} offerCardType={OfferCardType.Main} setActiveOffer={setActiveOffer}/>
                </> : <Loading/>
              }
            </section>
            <div className="cities__right-section">
              <Map city={CityToOffer.Amsterdam} offers={offers} activeOffer={activeOffer} type="cities"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
