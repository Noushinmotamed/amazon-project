//  const cart = JSON.parse(localStorage.getItem('cart')) || [];
export const cart = [
  {
    productId: 'id1',
    quantity: 3
  },
  {
    productId: 'id2',
    quantity: 1
  }
];
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
   return matchingItem;
}
