import { useEffect, useRef } from 'react';
import { CityToCenterLocationMap, CityToOffer } from '../../const';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';
import {Icon, layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: CityToOffer;
  offers: Offer[];
  activeOffer: Offer | null;
  type: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 40],
  iconAnchor: [14, 40]
});

function Map({ city, offers, activeOffer, type }: MapProps): JSX.Element {
  const cityCenterLocation = CityToCenterLocationMap[city];
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityCenterLocation);

  useEffect(() => {
    if (map) {
      map.setView([cityCenterLocation.latitude, cityCenterLocation.longitude], cityCenterLocation.zoom);
    }
  }, [map, cityCenterLocation]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          offer === activeOffer ? currentCustomIcon : defaultCustomIcon
        ).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOffer]);

  return (<section className={`${type}__map map`} ref={mapRef}/>);
}

export default Map;
