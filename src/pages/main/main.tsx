import { Offer } from '../../types/offer';
import OffersList from '../../components/offers-list/offers-list';
import { CityToCenterLocationMap, OfferCardType } from '../../const';
import React, { useEffect } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OffersSortingForm from '../../components/offers-sorting-form/offers-sorting-form';
import { fetchFavoriteOffers, fetchOffers } from '../../store/api-actions';
import Loading from '../../components/loading/loading';
import { Header } from '../../components/header/header';

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);
  const offers = useAppSelector((state) => state.currentOffers);
  const city = useAppSelector((state) => state.city);
  const authStatus = useAppSelector((state) => state.authStatus);
  const centerLocation = useAppSelector((state) => CityToCenterLocationMap[state.city]);
  const isDoneFetchingOffers = useAppSelector((state) => state.isDoneFetchingOffers);
  const isNoOffersAvailable = useAppSelector((state) => state.isDoneFetchingOffers && state.currentOffers.length === 0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchFavoriteOffers());
  }, [city, authStatus, dispatch]);

  return (
    <div className='page page--gray page--main'>
      <Header isActive/>
      <main className={`page__main page__main--index ${isNoOffersAvailable ? 'page__main--index-empty' : ''}`}>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList/>
        <div className='cities'>
          <div className={`cities__places-container container ${isNoOffersAvailable ? 'cities__places-container--empty' : ''}`}>
            {
              isNoOffersAvailable ?
                <section className='cities__no-places'>
                  <div className='cities__status-wrapper tabs__content'>
                    <b className='cities__status'>No places to stay available</b>
                    <p className='cities__status-description'>
                      We could not find any property available at the moment in {city.toString()}
                    </p>
                  </div>
                </section> :
                <section className='cities__places places'>
                  <h2 className='visually-hidden'>Places</h2>
                  {
                    isDoneFetchingOffers ?
                      <>
                        <b className='places__found'>
                          {offers.length} places to stay in {city.toString()}
                        </b>
                        <OffersSortingForm/>
                        <OffersList offers={offers} offerCardType={OfferCardType.Main} setActiveOffer={setActiveOffer}/>
                      </> : <Loading/>
                  }
                </section>
            }
            <div className='cities__right-section'>
              {
                isNoOffersAvailable ? '' : <Map centerLocation={centerLocation} offers={offers} activeOffer={activeOffer} type='cities'/>
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
