import { useEffect } from 'react';
import { CityToOffer } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CityTab from '../city-tab/city-tab';
import { getOffers } from '../../store/action';

export function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const getOffersOnSetCity = () => dispatch(getOffers());

  useEffect(() => {
    getOffersOnSetCity();
  }, [currentCity]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(CityToOffer).map((city) => <CityTab key={city} city={city}/>)}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
