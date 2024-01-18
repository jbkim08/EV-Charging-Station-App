import axios from 'axios';

const BASE_URL = 'https://places.googleapis.com/v1/places:searchNearby';
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': [
      'places.displayName',
      'places.formattedAddress',
      'places.location',
      'places.evChargeOptions',
      'places.shortFormattedAddress',
      'places.photos',
      'places.id',
    ],
  },
};

const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);

export default {
  NewNearByPlace,
};
