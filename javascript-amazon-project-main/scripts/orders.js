
import { addToCart, calculateCartQuantity, loadCartFetch } from "../data/cart.js"
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { products, Product, loadProductsFetch } from "../data/products.js";

async function renderOrderPage(){

  console.log(orders);
  
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
  try{
      await loadCartFetch();
      await loadProductsFetch();
    } catch(error) {
      console.log(`error in loading resources, order page:
        ${error}`);
  
    }
    
  renderOrdersGrid();
  
  document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
    let {productId,quantity} = button.dataset;
    console.log(`quantity: ${quantity}`);
    button.addEventListener('click',()=>{
      quantity = Number(quantity);
      addToCart(productId,quantity);
      document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
      
    })
  })

  
  

}
renderOrderPage();

function renderOrdersGrid(){
  const gridElement = document.querySelector('.js-orders-grid');
  orders.forEach((order)=>{
    gridElement.innerHTML += `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-detailed-grid">
           ${renderDetailedGrid(order.products,order)}
          </div>
        </div>`
  })
}

function renderDetailedGrid(orderProducts,order){ 
  let html = '';
  orderProducts.forEach((orderProduct)=>{
    console.log(orderProduct.estimatedDeliveryTime);
    let matchingtItem;
    products.forEach((product)=>{
      if ( product.getId() === orderProduct.productId) matchingtItem = product;
    })
    html += `<div class="product-image-container">
              <img src=${matchingtItem.getImageUrl()}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingtItem.getName()}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${orderProduct.productId}" data-quantity="${orderProduct.quantity}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
                <button class="track-package-button button-secondary js-track-package-button">
                  Track package
                </button>
              </a>
            </div>`

  });
  return html;
   

}