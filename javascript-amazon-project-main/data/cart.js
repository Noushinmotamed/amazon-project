export let  cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId,quantity){
  let matchingItem;
  cart.forEach((cartItem) =>{
    if (cartItem.productId === productId) matchingItem = cartItem;
   });
   if(!matchingItem){
   cart.push({
    productId,
    quantity
   });}else{
    matchingItem.quantity += quantity;
   }
   addToStorage();
   return matchingItem;
}
export function updateItemQuantity(itemLink){
  
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
}
function addToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
