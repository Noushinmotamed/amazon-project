import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

export let cart;

loadFromStorage();

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
export function deleteItemQuantity(productId){
  cart.forEach((item,index) => {
    if (item.productId === productId) cart.splice(index,1);
  });
  console.log(cart);
  renderOrderSummary();
  addToStorage();
  renderCheckoutHeader();
  renderPaymentSummary();
  
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
  renderCheckoutHeader();
  document.querySelector(`.js-quantity-input-${id}`).classList.remove('is-editing-quantity');
  document.querySelector(`.js-save-quantity-link-${id}`).classList.remove('is-editing-quantity');
  document.querySelector(`.js-quantity-label-${id}`).innerHTML = value;
  console.log(cart);
  renderPaymentSummary();
  console.log('got here');

  
}
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
   cart.forEach((cartItem)=>{
    if (cartItem.productId === productId) matchingItem = cartItem;
   });
   if(!matchingItem) return;

   matchingItem.deliveryOptionId = deliveryOptionId;
   addToStorage();
   renderPaymentSummary();
}

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',() =>{
   console.log(xhr.response);
 fun();
  });
 
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}