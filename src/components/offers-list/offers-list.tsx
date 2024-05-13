import React from 'react';
import { Offer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import {OfferCardType} from '../../const';

type OffersListProps = {
  offers: Offer[];
  offerCardType: OfferCardType;
};

function OffersList({ offers, offerCardType }: OffersListProps) {
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);
  const favoritesCitiesNames = [...new Set(offers.map((offer) => offer.city.name))];
  if (activeOffer === null){
    offers = [...offers];
  }
  // setActiveOffer(activeOffer);
  switch (offerCardType){
    case OfferCardType.Main:
      return (
        <div className='cities__places-list places__list tabs__content'>
          {offers.map((offer) => (
            <OfferCard offer={offer} offerCardType={offerCardType} key={offer.id} onMouseOver={() => setActiveOffer(offer)}/>
          ))}
        </div>
      );
    case OfferCardType.Favorite:
      return (
        <ul className='favorites__list'>
          {favoritesCitiesNames.map((city) => (
            <li className='favorites__locations-items' key={city}>
              <div className='favorites__locations locations locations--current'>
                <a className='locations__item-link' href='#'>
                  <span>{city}</span>
                </a>
              </div>
              <div className='favorites__places'>
                {offers.filter((offer) => offer.city.name === city).map((offer) => (
                  <OfferCard offer={offer} offerCardType={offerCardType} key={offer.id} onMouseOver={() => setActiveOffer(offer)}/>
                ))}
              </div>
            </li>
          )
          )}
        </ul>
      );
    default:
      return null;
  }
}

export default OffersList;
