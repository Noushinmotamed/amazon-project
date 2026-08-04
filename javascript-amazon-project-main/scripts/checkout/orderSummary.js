import {cart, updateItemQuantity, deleteItemQuantity, calculateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
export function renderOrderSummary(){
let cartHTML = ''
function displayCart(){
  cartHTML = '';
cart.forEach((cartItem)=>{

  let id = cartItem.productId;
  let quantity = cartItem.quantity;
  let matchingItem = getProduct(id);

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
   
    
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
     
    }
  });
  if (!deliveryOption) {
  deliveryOption = deliveryOptions[0]; // fallback default
}
   const deliveryDate = dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');


 cartHTML +=
  `
          <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery Date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity">
                  <span class="span-quantity">
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link-${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id = "${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                  </div>
               ${deliveryOptionsHTML(matchingItem,cartItem)}
              </div>
            </div>
          </div>
        `;
});
document.querySelector('.js-order-summary').innerHTML = cartHTML;
console.log(cart);
renderCheckoutHeader();
//document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity() + ' items';
}
displayCart();
document.querySelectorAll('.js-delete-quantity-link').forEach((itemLink) => {
 itemLink.addEventListener('click',()=> { 
  deleteItemQuantity(itemLink);

}
);
});
document.querySelectorAll('.js-update-quantity-link').forEach((itemLink) => {
 itemLink.addEventListener('click',()=> { 
  updateItemQuantity(itemLink);
 
});
});
function addToStorage(){
  localStorage.addItem('cart',JSON.stringify(cart));
}
console.log(dayjs());
function deliveryOptionsHTML(matchingItem,cartItem){
  let html='';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D');
    const price = deliveryOption.priceCents === 0 ? 'FREE shipping' : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
     html += `
                <div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}"
                data-delivery-option-id="${deliveryOption.id}" >
                  <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input-${deliveryOption.id}"}
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                    ${price}
                    </div>
                  </div>
                </div>
                `;
                });
                return html;
}
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId} = element.dataset;
   updateDeliveryOption(productId,deliveryOptionId);
   renderOrderSummary();
  });
  
});
}

