import { CityToOffer } from '../../const';

type CityTabProps = {
  city: CityToOffer;
};

export function CityTab ({city}: CityTabProps): JSX.Element {
  return (
	<li className="locations__item">
		<a className="locations__item-link tabs__item" href="#">
			<span>{city.toString()}</span>
		</a>
	</li>
  );
}

export default CityTab;
