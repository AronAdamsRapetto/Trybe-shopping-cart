const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.getItem('carrinho') === null) {
    localStorage.setItem('carrinho', JSON.stringify([]));
    return [];
  }
  const carrinhoCompras = JSON.parse(localStorage.getItem('carrinho'));
  return carrinhoCompras;   
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
