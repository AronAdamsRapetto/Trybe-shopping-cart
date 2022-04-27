const getSavedCartItems = () => {
  const carrinhoCompras = localStorage.getItem('cartItems');
  return carrinhoCompras;   
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
