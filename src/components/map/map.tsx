import { useEffect, useRef } from 'react';
import { Location } from '../../types/location';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';
import {Icon, layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  activeOffer: Offer | null;
  type: string;
  centerLocation: Location;
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

function Map({ offers, activeOffer, type, centerLocation }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, centerLocation);

  useEffect(() => {
    if (map) {
      map.setView([centerLocation.latitude, centerLocation.longitude], centerLocation.zoom);
    }
  }, [map, centerLocation]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          (offer === activeOffer) ? currentCustomIcon : defaultCustomIcon
        ).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOffer, centerLocation]);

  return (<section className={`${type}__map map`} ref={mapRef}/>);
}

export default Map;
