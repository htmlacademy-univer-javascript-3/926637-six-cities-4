import OffersList from '../../components/offers-list/offers-list';
import { OfferCardType } from '../../const';
import { useEffect } from 'react';
import Map from '../../components/map/map';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { fetchCurrentOffer } from '../../store/api-actions';
import Loading from '../../components/loading/loading';
import { OfferCardDetailed } from '../../components/offer-detailed/offer-detailed';


function OfferPage(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authStatus);
  const params = useParams();
  const offerId = params.id;
  const dispatch = useAppDispatch();
  const isDoneFetchingCurrentOffer = useAppSelector((state) => state.isDoneFetchingCurrentOffer);
  const isDoneFetchingClosestOffers = useAppSelector((state) => state.isDoneFetchingClosestOffers);
  const isDoneFetchingOfferComments = useAppSelector((state) => state.isDoneFetchingOfferComments);
  const comments = useAppSelector((state) => state.offerComments);
  const closestOffers = useAppSelector((state) => state.currentClosestOffers);
  const currentOffer = useAppSelector((state) => state.currentOffer);

  useEffect(() => {
    if (offerId !== undefined){
      dispatch(fetchCurrentOffer(offerId));
    }
  }, [offerId, dispatch]);

  return (
    <div className='page'>
      <Header isActive={false}/>
      <main className='page__main page__main--offer'>
        <section className='offer'>
          {
            (isDoneFetchingCurrentOffer && currentOffer !== null) ? <OfferCardDetailed currentOffer={currentOffer} isDoneFetchingOfferComments={isDoneFetchingOfferComments} authStatus={authStatus} comments={comments}/> : <Loading/>
          }
          {
            (isDoneFetchingClosestOffers && currentOffer !== null) ? <Map centerLocation={currentOffer.city.location} offers={[...closestOffers, currentOffer]} activeOffer={currentOffer} type='offer'/> : <Loading/>
          }
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            {
              isDoneFetchingClosestOffers ? <OffersList offers={closestOffers} offerCardType={OfferCardType.Offer} setActiveOffer={() => {}}/> : ''
            }
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
