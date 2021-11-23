import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriteresturant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a');

      expect(presenter.latestQuery)
        .toEqual('restaurant a');
    });

    it('should ask the model to search for restaurant', () => {
      searchRestaurants('restaurant a');

      expect(FavoriteRestaurantIdb.searchRestaurants)
        .toHaveBeenCalledWith('restaurant a');
    });


    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');
     
        done();
      });
     
      favoriteRestaurants.searchRestaurants.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);
     
      searchRestaurants('film a');
    });

    it('should show the restaurants found by Favorite restaurants', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde'},
        { id: 333, name: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');

      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('   ');

      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');

      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');

      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('restaurant a');
    });
    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });
  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length)
            .toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });
  });
});
