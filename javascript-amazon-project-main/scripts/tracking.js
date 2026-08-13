import { getOrder, getOrderProduct } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateCartQuantity } from "../data/cart.js";



async function renderTrackingPage(){
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  await loadProductsFetch();

  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

  const product = getOrderProduct(productId,orderId);
  const order = getOrder(orderId);
  const cartProduct = getProduct(productId);
  console.log(productId);
  console.log(product);
  console.log(order);
  
  const html = 
        `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${cartProduct.getName()}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src=${cartProduct.getImageUrl()}>

        <div class="progress-labels-container">
          <div class="progress-label current-status">
            Preparing
          </div>
          <div class="progress-label js-label-2">
            Shipped
          </div>
          <div class="progress-label js-label-3">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>`;

        document.querySelector('.js-order-tracking').innerHTML = html;
        console.log(calculateProgress(order,product));
        const progress = calculateProgress(order, product);

        document.querySelector('.js-progress-bar').style.width = `${progress}%`;
        
      

}
function calculateProgress(order,product){
  const orderTime = dayjs(order.orderTime)
  const currentTime = dayjs();
  const deliveryTime = dayjs(product.estimatedDeliveryTime);
  const result = (currentTime.diff(orderTime)/ deliveryTime.diff(orderTime))*100;
   if (50 <= result && result < 100) {
    document.querySelector('.js-label-2').classList.add('current-status');
   }else if ( result >= 100){
    document.querySelector('.js-label-3').classList.add('current-status');
   }
   return result;

}
renderTrackingPage();

