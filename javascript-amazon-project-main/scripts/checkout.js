import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/cart-class.js';


async function loadPage(){
  try{
   
    // await loadProductsFetch();
    // await loadCartFetch();
    await Promise.all([
      loadCartFetch(),
      loadProductsFetch()
    ])

  } catch(error) {
    console.log(`error in loading resources:
      ${error}`);

  }
  
  
  renderOrderSummary();
  renderPaymentSummary();
  
}
loadPage().then(()=>{
 console.log('finished loading page');
})
/*
Promise.all([
  loadProductsFetch(),

   new Promise((resolve)=>{
    loadCart(()=>{
       console.log('finished loading cart');
      resolve();
    });


  })


]).then(()=>{
   console.log('now render the page');
    renderOrderSummary();
    renderPaymentSummary();
})
    */

/*new Promise((resolve)=>{
  loadProducts(()=>{
     console.log('finished loading products');
    resolve('value1');
  });


}).then((value)=>{

  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
       console.log('finished loading cart');
      resolve();
    });


  }).then(()=>{
     console.log('now render the page');
    renderOrderSummary();
    renderPaymentSummary();

  });
})
  */
 


// loadProducts(()=>{
//   loadCart(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
