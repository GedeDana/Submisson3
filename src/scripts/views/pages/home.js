import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createResturantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="content">
    <div class="latest">
        <h1 class="latest__label">Explore Restaurant</h1>
        <div class="posts" id="post-item">
            
        </div>
    </div>
    </section>
        `;
  },

  async afterRender() {
    const restaurant = await TheRestaurantDbSource.restaurantList();
    const restaurantContainer = document.querySelector('#post-item');
    restaurant.forEach((restaurants) => {
      restaurantContainer.innerHTML += createResturantItemTemplate(restaurants);
    });
  },

};
export default Home;
