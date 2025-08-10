const getOrderRestaurantDetails = (req, res) => {
const orderId = req.params.orderId;
console.log('Fetching restaurant details for order:', orderId);
};

module.exports = {
  getOrderRestaurantDetails
};
