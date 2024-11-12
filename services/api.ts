import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.wefood.dev',
});

export const fetchRestaurants = (offset: number, limit: number) => 
  api.get('/restaurants', { params: { offset, limit } });

export const fetchRestaurantDetails = (id: string) => 
  api.get(`/restaurants/${id}`)
    .then(response => response)
    .catch(error => {
      if (error.response) {
        return error.response;
      }
      throw error;
    });