import { calculateCartQuantity } from "../../data/cart.js"

export function renderCheckoutHeader(){
  const quantity = calculateCartQuantity();
  const html = `<div class="checkout-header-middle-section js-checkout-header-middle-section">
          Checkout (<a class="return-to-home-link "
            href="amazon.html">${quantity} Items</a>)
        </div>`;
  document.querySelector('.js-checkout-header-middle-section').innerHTML = html;
}