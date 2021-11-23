import CONFIG from '../../globals/config';

const createResturantItemTemplate = (restaurants) => `
<article class="post-item">
 <img class="post-item__thumbnail"
    src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurants.pictureId}"
    alt="${restaurants.name}">
  <div class="post-city">${restaurants.city}</div>
  <div class="post-item__content">
  <p class="post-item__rating">Rating <a href="#" class="post-item__rating__value"> ${restaurants.rating}</a>
   </p>
      <h1 class="post-item__title"><a href="${`/#/detail/${restaurants.id}`}">${restaurants.name}</a></h1>
      <p class="post-item__description">${restaurants.description}</p>
  </div>
</article>`;

const createRestaurantDetailTemplate = (restaurants) => `
<div class="post__header">
  <h2 class="post__title">${restaurants.name}</h2>
  <img class="post__poster" src="${CONFIG.BASE_IMAGE_URL_MEDIUM + restaurants.pictureId}" alt="${restaurants.name}" />
<div>
<div class="box-info-container-grid">
  <div class="box post__info__container">
    <h2>Information</h2>
    <div class="post__info__detail">
      <h3>Alamat</h3>
      <p>${restaurants.address}</p>
      <br>
      <h3>Kota</h3>
      <p>${restaurants.city}</p>
      </br>
      <br>
      <h3>Description</h3>
      <p>${restaurants.description}</p>
      </br>
    </div>
  </div>
    <div class="box post__food__list">
        <h2>Food</h2>
        <div class="post__info__detail">
          <ol> ${restaurants.menus.foods.map((food) => ` <li>${food.name}</li> `).join('')} </ol>
        </div>
    </div>
    <div class="box post__drink__list">
      <h2>Drink</h2>
      <div class="post__info__detail">
        <ol> ${restaurants.menus.drinks.map((drink) => ` <li>${drink.name}</li> `).join('')} </ol>
      </div>
    </div>
  <div class="box post__overview">
    <h2>Customer Reviews</h2>
    <div class="post__info__review">
      ${restaurants.customerReviews.map((review) => `
      <br>
        <h3>${review.name}</h3>
        <small>${review.date}</small>
        <p>${review.review}</p>
      </br>
      `).join('')}        
    </div>
  </div>
</div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeResturantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createLikeRestaurantButtonTemplate,
  createUnlikeResturantButtonTemplate,
  createRestaurantDetailTemplate,
  createResturantItemTemplate,
};
