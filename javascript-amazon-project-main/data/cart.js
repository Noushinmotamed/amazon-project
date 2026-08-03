export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId,quantity){
  let matchingItem;
  cart.forEach((cartItem) =>{
    if (cartItem.productId === productId) matchingItem = cartItem;
   });
   if(!matchingItem){
   cart.push({
    productId,
    quantity,
    deliveryOptionId: '3'
   });
  }else{
    matchingItem.quantity += quantity;
   }
   addToStorage();
   return matchingItem;
}
let inputting = false;
export function updateItemQuantity(itemLink){
  const productId = itemLink.dataset.productId;
  const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
  const saveLinkElement = document.querySelector(`.js-save-quantity-link-${productId}`);
  
  if(!inputElement.classList.contains('is-editing-quantity')){
    inputElement.classList.add('is-editing-quantity');
    saveLinkElement.classList.add('is-editing-quantity');
    saveLinkElement.addEventListener('click', () =>{
      const inputValue = inputElement.value;
      saveQuantity(productId,inputValue)});
      
  }
}
export function deleteItemQuantity(itemLink){
  const productId = itemLink.dataset.productId;
  cart.forEach((item,index) => {
    if (item.productId === productId) cart.splice(index,1);
  });
  console.log(cart);
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.remove();
  addToStorage();
  document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity() + ' items';
}
function addToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function calculateCartQuantity(){
  let cartQuantity=0;
  cart.forEach((product) =>{
     cartQuantity += product.quantity;
  });
  //document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity + ' items';
  return cartQuantity;
}
function saveQuantity(id,value){
  if ( value > 10 || value <=0 || !value || isNaN(Number(value))) return;
  value = Number(value);
  console.log('running');
  cart.forEach((cartItem)=>{
    if (cartItem.productId === id) {
       cartItem.quantity = value;
    }
  });
  addToStorage();
  document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity() + ' items';
  document.querySelector(`.js-quantity-input-${id}`).classList.remove('is-editing-quantity');
  document.querySelector(`.js-save-quantity-link-${id}`).classList.remove('is-editing-quantity');
  document.querySelector(`.js-quantity-label-${id}`).innerHTML = value;
  console.log(cart);

  
}