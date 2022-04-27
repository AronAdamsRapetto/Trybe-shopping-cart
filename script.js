let listaCarrinho = [];
// criação de tabela de produtos

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// pega id do produto

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// Atualiza valor total do carrinho

const getValores = async () => {   
  const produtos = await fetchProducts();
  const precos = [];
  listaCarrinho.forEach((id) => {
    precos.push(produtos.find((produto) => produto.id === id));
  });
  const valorTotal = precos.reduce((acc, preco) => acc + preco.price, 0);  
  return valorTotal;
};

const criaElementoCustoCarrinho = async () => {
  const textoPreço = document.getElementsByClassName('total-price'); 
  total = await getValores(); 
  textoPreço[0].innerText = `${total}`;
};

// remove produto do carrinho

function cartItemClickListener(event) {  
  const elemento = event.target;
  const id = elemento.innerText.slice(5, 18);
  listaCarrinho = listaCarrinho.filter((idProduto) => id !== idProduto);
  saveCartItems(listaCarrinho); 
  criaElementoCustoCarrinho();
  elemento.remove();  
}

// armazena produto no localStorage

const guardaProduto = (idProduto) => {
  listaCarrinho.push(idProduto);
  saveCartItems(listaCarrinho);
};

// cria produto no carrinho

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);  
  return li;
}

const salvaProduto = async (event) => {
  const item = event.target.parentElement;
  const id = getSkuFromProductItem(item);
  guardaProduto(id);
  const data = await fetchItem(id);
  const novoElemento = createCartItemElement(data);
  const carrinho = document.getElementsByClassName('cart__items');
  carrinho[0].appendChild(novoElemento);
  await criaElementoCustoCarrinho();  
};

// adiciona tabla de produtos 

const addProdutos = async () => {
  const dataProdutos = await fetchProducts();
  await dataProdutos.forEach((produto) => {  
    const novoElemento = createProductItemElement(produto);
    novoElemento.lastChild.addEventListener('click', salvaProduto);
    const sectionItems = document.getElementsByClassName('items');
    sectionItems[0].appendChild(novoElemento);
  });
};

addProdutos();

// carrega localStorage do carrinho

window.onload = async () => {
  listaCarrinho = getSavedCartItems();
  listaCarrinho.forEach(async (idProduto) => {
    const data = await fetchItem(idProduto);
    const novoElemento = createCartItemElement(data);
    const carrinho = document.getElementsByClassName('cart__items');
    carrinho[0].appendChild(novoElemento);
    await criaElementoCustoCarrinho();
  });
};
