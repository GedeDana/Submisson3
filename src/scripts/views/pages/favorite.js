import FavoriteResturantIdb from '../../data/favoriteresturant-idb';
import { createResturantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <section class="content">
    <div class="latest">
        <h1 class="latest__label">Favorite Restaurant</h1>
        <div class="posts" id="post-item">
            
        </div>
    </div>
</section> 
      `;
  },

  async afterRender() {
    const restaurants = await FavoriteResturantIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('#post-item');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createResturantItemTemplate(restaurant);
    });
  },

};
export default Favorite;
