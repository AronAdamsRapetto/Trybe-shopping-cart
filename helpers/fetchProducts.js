const fetchProducts = async () => {
  // seu código aqui  
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const response = await fetch(url);
    const data = await response.json();
    
    return data.results;
  } catch (erro) {
    return erro;
  }
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
