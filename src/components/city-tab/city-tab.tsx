import { CityToOffer } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCityToOffer } from '../../store/action';

type CityTabProps = {
  city: CityToOffer;
};

export function CityTab ({city}: CityTabProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const handleOnClick = () => dispatch(setCityToOffer(city));

  return (
    <li className='locations__item'>
      <a className={`locations__item-link tabs__item ${(city === currentCity) ? 'tabs__item--active' : ''}`} onClick={handleOnClick}>
        <span>{city.toString()}</span>
      </a>
    </li>
  );
}

export default CityTab;
