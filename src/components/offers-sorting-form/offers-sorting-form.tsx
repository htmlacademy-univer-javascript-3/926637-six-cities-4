import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OffersSortingType } from '../../const';
import { setCurrentOffers, setOffersSortingType } from '../../store/action';

export function OffersSortingForm(): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const lastFetchedOffers = useAppSelector((state) => state.lastFetchedOffers);
  const offersSortingType = useAppSelector((state) => state.offersSortingType);
  const dispatchSetOfferSortingType = (offerSortingType: OffersSortingType) => dispatch(setOffersSortingType(offerSortingType));
  const toggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    let newOffers = lastFetchedOffers;
    switch (offersSortingType){
      case OffersSortingType.PopularityDescending:
        newOffers = [...lastFetchedOffers];
        break;
      case OffersSortingType.PriceAscending:
        newOffers = lastFetchedOffers.toSorted((offer1, offer2) => offer1.price - offer2.price);
        break;
      case OffersSortingType.PriceDescending:
        newOffers = lastFetchedOffers.toSorted((offer1, offer2) => offer2.price - offer1.price);
        break;
      case OffersSortingType.RatingDescending:
        newOffers = lastFetchedOffers.toSorted((offer1, offer2) => offer2.rating - offer1.rating);
        break;
      default:
        break;
    }
    dispatch(setCurrentOffers(newOffers));
  }, [offersSortingType, lastFetchedOffers, dispatch]
  );

  useEffect(() => {
    setIsOpened(false);
  }, [city]);

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by </span>
      <span className='places__sorting-type' tabIndex={0} onClick={toggleIsOpened}>
        {offersSortingType.toString()}
        <svg className='places__sorting-arrow' width={7} height={4}>
          <use xlinkHref='#icon-arrow-select'/>
        </svg>
      </span>
      {
        isOpened ?
          <ul className='places__options places__options--custom places__options--opened'>
            {Object.values(OffersSortingType).map((sortingType: OffersSortingType, index: number) => (
              <li className={`places__option ${(sortingType === offersSortingType) ? 'places__option--active' : ''}`}
                tabIndex={index}
                key={sortingType.toString()}
                onClick={() => {
                  dispatchSetOfferSortingType(sortingType);
                  setIsOpened(false);
                }}
              >
                {sortingType.toString()}
              </li>
            ))}
          </ul> : ''
      }
    </form>
  );
}

export default OffersSortingForm;
