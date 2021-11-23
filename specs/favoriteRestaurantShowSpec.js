import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriteresturant-idb';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getFavoriteRestaurantTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should ask for the favorite movies', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurant have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length)
          .toEqual(1);

        done();
      });
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurants.getAllRestaurants.and.returnValues([]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.post-item').length).toEqual(2);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurants.getAllRestaurants.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah Restaurant A',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah restaurant B',
        },
      ]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
