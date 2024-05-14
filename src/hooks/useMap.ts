import {useEffect, useState, useRef, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import { Location } from '../types/location';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, centerLocation: Location) {
	const [map, setMap] = useState<leaflet.Map | null>(null);
	const isRenderedRef = useRef(false);

	useEffect(() => {
		if (mapRef.current !== null && !isRenderedRef.current) {
		const instance = leaflet.map(mapRef.current, {
			center: {
			lat: centerLocation.latitude,
				lng: centerLocation.longitude,
			},
			zoom: centerLocation.zoom,
		});

		leaflet
			.tileLayer(
			'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
			{
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			},
			)
			.addTo(instance);

		setMap(instance);
		isRenderedRef.current = true;
		}
	}, [mapRef, centerLocation]);

	return map;
}

export default useMap;
  