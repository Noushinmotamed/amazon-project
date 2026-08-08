
import {addToCart, cart, calculateCartQuantity } from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let productsHTML = '';
let cartQuantity =  calculateCartQuantity() || 0 ;
document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();


products.forEach((product) => {
  productsHTML += 
  //product.createHTML();
   `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.getImageUrl()}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.getName()}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.getCount()}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container js-product-quantity-container" data-product-id=${product.getId()}>
            <select class="js-quantity-selector-${product.getId()}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.getId()}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${product.getId()}">
            Add to Cart
          </button>
        </div>`;
        
        
});


document.querySelector('.js-products-grid').innerHTML = productsHTML;
document.querySelectorAll('.js-add-to-cart-button').forEach((button) =>{
  button.addEventListener('click',() => {
   const productId= button.dataset.productId;
   let quantity = getQuantity(productId);
   let addedMessage = getMessage(productId);
    quantity = Number(quantity);
     console.log(quantity);
   let matchingItem = addToCart(productId,quantity);
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
    console.log(cart);
  });
});

function getQuantity(id){
  const selectorElement = document.querySelector(`.js-quantity-selector-${id}`);
  return selectorElement.value;
}
let timeOutId;
function getMessage(id){
  const element = document.querySelector(`.js-added-to-cart-${id}`);
  clearTimeout(timeOutId);
  timeOutId = setTimeout(()=>{
    element.classList.remove('add-to-cart-visible');
  },2000);
  element.classList.add('add-to-cart-visible');
}
