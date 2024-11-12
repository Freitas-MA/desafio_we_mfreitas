interface Cuisine {
  _id: string;
  name: {
    en: string;
    'pt-PT': string;
    'pt-BR': string;
  };
  tag: string;
}

interface Image {
  file: string;
  url: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  addressInfo: {
    address: string;
    city: string;
    postalCode: string;
    state?: string;
    country: string;
  };
  contacts: {
    phoneNumber: string;
    email: string;
  };
  location: {
    coordinates: [number, number];
    type: string;
  };
  image?: Image;
  cuisines: Cuisine[];
  company: string;
  type: string;
  enabled: boolean;
  subscriptions?: {
    wefood: boolean;
  };
  marketPlaceUnit?: {
    _id: string;
    name: string;
  };
}

export interface MinimalRestaurant {
  _id: string;
  name: string;
  image?: {
    url: string;
  };
}