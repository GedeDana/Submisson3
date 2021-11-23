import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailResturant(id) {
    const responnse = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await responnse.json();
    return responseJson.restaurant;
  }
}

export default TheRestaurantDbSource;
