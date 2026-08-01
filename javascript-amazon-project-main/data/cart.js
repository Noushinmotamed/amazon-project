//  const cart = JSON.parse(localStorage.getItem('cart')) || [];

export let cart = [
  {
    productId: 'id1',
    quantity: 3
  },
  {
    productId: 'id2',
    quantity: 1
  },
  {
    productId: 'bc2847e9-5323-403f-b7cf-57fde044a955',
    quantity: 5
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
export function updateItemQuantity(itemLink){
  
}
export function deleteItemQuantity(itemLink){
  const productId = itemLink.dataset.productId;
  cart.forEach((item,index) => {
    if (item.productId === productId) cart.splice(index,1);
  });
  console.log(cart);
}
