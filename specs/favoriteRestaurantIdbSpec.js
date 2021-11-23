import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteResturantIdb from '../src/scripts/data/favoriteresturant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteResturantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteResturantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteResturantIdb);
});
