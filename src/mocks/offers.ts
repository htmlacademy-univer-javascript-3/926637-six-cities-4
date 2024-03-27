export type Offer = {
  id: string
  title: string
  type: string
  price: number
  city: {
    name: string
    location: {
      latitude: number
      longitude: number
      zoom: number
    }
  }
  location: {
    latitude: number
    longitude: number
    zoom: number
  }
  isFavorite: boolean
  isPremium: boolean
  rating: number
  previewImage: string
};

export const offers: Offer[] = [
  {
    "id": "6af6f711-c28d-4121-82cd-e0b462a27f00",
    "title": "A nice place to live.",
    "type": "apartment",
    "price": 146,
    "city": {
      "name": "Murmansk",
      "location": {
        "latitude": 68.9733,
        "longitude": 33.0856,
        "zoom": 1
      }
    },
    "location": {
      "latitude": 68.9733,
      "longitude": 33.0856,
      "zoom": 1
    },
    "isFavorite": true,
    "isPremium": true,
    "rating": 5,
    "previewImage": "https://www.advantour.com/img/russia/images/murmansk.jpg"
  },
  {
    "id": "6af6f711-c28d-4121-82cd-e0b462a27f01",
    "title": "A bad place to live.",
    "type": "apartment",
    "price": 133700,
    "city": {
      "name": "Chelyabinsk",
      "location": {
        "latitude": 55.1644,
        "longitude": 61.4368,
        "zoom": 2
      }
    },
    "location": {
      "latitude": 55.1644,
      "longitude": 61.4368,
      "zoom": 2
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 2,
    "previewImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0_%D1%81_%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%282021%29.jpg/1200px-%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%B0_%D1%81_%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%282021%29.jpg"
  },
  {
    "id": "6af6f711-c28d-4121-82cd-e0b462a27f02",
    "title": "A nice place to be born.",
    "type": "house",
    "price": 112,
    "city": {
      "name": "Samara",
      "location": {
        "latitude": 53.2038,
        "longitude": 50.1606,
        "zoom": 4
      }
    },
    "location": {
        "latitude": 53.2038,
        "longitude": 50.1606,
        "zoom": 4
    },
    "isFavorite": true,
    "isPremium": false,
    "rating": 4,
    "previewImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Samara_P5171857_2200.jpg/1200px-Samara_P5171857_2200.jpg"
  },
  {
    "id": "6af6f711-c28d-4121-82cd-e0b462a27f03",
    "title": "A bad place to be born.",
    "type": "apartment",
    "price": 911,
    "city": {
      "name": "Moscow",
      "location": {
        "latitude": 55.7558,
        "longitude": 37.6173,
        "zoom": 8
      }
    },
    "location": {
      "latitude": 55.7558,
      "longitude": 37.6173,
      "zoom": 8
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 3,
    "previewImage": "https://www.planete-energies.com/sites/default/files/styles/1200x630/public/migrated_files/images/thumbnails/image/moscow.jpg?itok=lPt9jNWR"
  },
];