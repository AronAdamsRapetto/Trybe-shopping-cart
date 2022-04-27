const saveCartItems = (ids) => {
  // seu código aqui
  localStorage.setItem('cartItems', JSON.stringify(ids));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
