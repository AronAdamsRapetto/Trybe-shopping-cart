const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.getItem('cartItems') === null) {
    localStorage.setItem('cartItems', JSON.stringify([]));
    return [];
  }
  const carrinhoCompras = JSON.parse(localStorage.getItem('cartItems'));
  return carrinhoCompras;   
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
