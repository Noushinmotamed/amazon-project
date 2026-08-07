import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

function Cart(){
  const cart = {
   cartItems: undefined,
   loadFromStorage(localStorageKey){
     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
   },
    addToStorage(localStorageKey){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
},
 addToCart(productId,quantity){
  let matchingItem;
  this.cartItems.forEach((cartItem) =>{
    if (cartItem.productId === productId) matchingItem = cartItem;
   });
   if(!matchingItem){
   this.cartItems.push({
    productId,
    quantity,
    deliveryOptionId: '3'
   });
  }else{
    matchingItem.quantity += quantity;
   }
   this.addToStorage();
   return matchingItem;
},
 deleteItemQuantity(productId){
  this.cartItems.forEach((item,index) => {
    if (item.productId === productId) cart.splice(index,1);
  });
  console.log(this.cartItems);
  renderOrderSummary();
  this.addToStorage();
  renderCheckoutHeader();
  renderPaymentSummary();
  
},
 updateItemQuantity(itemLink){
  const productId = itemLink.dataset.productId;
  const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
  const saveLinkElement = document.querySelector(`.js-save-quantity-link-${productId}`);
  
  if(!inputElement.classList.contains('is-editing-quantity')){
    inputElement.classList.add('is-editing-quantity');
    saveLinkElement.classList.add('is-editing-quantity');
    saveLinkElement.addEventListener('click', () =>{
      const inputValue = inputElement.value;
      this.saveQuantity(productId,inputValue)});
      
  }
},
 saveQuantity(id,value){
  if ( value > 10 || value <=0 || !value || isNaN(Number(value))) return;
  value = Number(value);
  console.log('running');
  this.cartItems.forEach((cartItem)=>{
    if (cartItem.productId === id) {
       cartItem.quantity = value;
    }
    });
  this.addToStorage();
  renderCheckoutHeader();
  document.querySelector(`.js-quantity-input-${id}`).classList.remove('is-editing-quantity');
  document.querySelector(`.js-save-quantity-link-${id}`).classList.remove('is-editing-quantity');
  document.querySelector(`.js-quantity-label-${id}`).innerHTML = value;
  console.log(this.cartItems);
  renderPaymentSummary();
},
calculateCartQuantity(){
  let cartQuantity=0;
  this.cartItems.forEach((product) =>{
     cartQuantity += product.quantity;
  });
  //document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity + ' items';
  return cartQuantity;
},
 updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
   this.cartItems.forEach((cartItem)=>{
    if (cartItem.productId === productId) matchingItem = cartItem;
   });
   if(!matchingItem) return;

   matchingItem.deliveryOptionId = deliveryOptionId;
   this.addToStorage();
   renderPaymentSummary();
}


};
return cart

}


const cart = Cart('cart-oop');
const bussinessCart = Cart('cart-bussiness');
cart.loadFromStorage();
bussinessCart.loadFromStorage();
cart.addToCart('id1');
console.log(cart);
console.log(bussinessCart);



  
