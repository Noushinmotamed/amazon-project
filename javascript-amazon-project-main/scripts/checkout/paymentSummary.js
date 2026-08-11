import { calculateCartQuantity } from "../../data/cart.js";
import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {  addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
  const cartQuantity = calculateCartQuantity();
  const itemsCost = calculateCost();
  const shippingCost = calculateShipping();
  const totalBeforeTax = itemsCost + shippingCost;
  const estimatedTax = totalBeforeTax*0.1;
  const totalCost = totalBeforeTax + estimatedTax;
  let html = ` <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
        </div>`;

        document.querySelector('.js-payment-summary').innerHTML = html;
  function calculateCost(){
  let cost = 0;
  cart.forEach(element => {
    const quantity = Number(element.quantity);
    const productId = element.productId;
    const matchingItem = getProduct(productId);
    console.log(matchingItem);
    if(matchingItem) cost += matchingItem.priceCents * element.quantity;
  }); 
  return Number(cost);
}
function calculateShipping(){
  let shippingCost = 0;
  cart.forEach((cartItem)=>{
    if (cartItem.deliveryOptionId === '2') {
      shippingCost += 499;
    }
    else if (cartItem.deliveryOptionId === '3') {
      shippingCost += 999;
    }
  });


return Number(shippingCost);
}
document.querySelector('.js-place-order-button').addEventListener('click', async()=>{
   try{const response = await fetch('https://supersimplebackend.dev/orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: cart
    })
  });

  const orderData = await response.json();
  console.log(orderData);
  addOrder(orderData);
}catch(error){
  console.log(`error in placing order:
    ${error}`);
}
window.location.href = 'orders.html';
});

}
