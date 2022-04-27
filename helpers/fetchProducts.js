const fetchProducts = async (seletor) => {
  // seu código aqui  
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${seletor}`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
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
