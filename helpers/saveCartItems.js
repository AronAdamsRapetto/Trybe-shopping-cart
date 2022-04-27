const saveCartItems = (ids) => {
  // seu código aqui
  localStorage.setItem('carrinho', JSON.stringify(ids));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
