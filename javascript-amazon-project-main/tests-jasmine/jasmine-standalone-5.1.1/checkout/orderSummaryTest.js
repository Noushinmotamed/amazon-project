import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../../data/cart.js";

describe('Test suite: RenderOrderSummary', ()=>{
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
        const optionId1 = '1';
        const optionId2 = '2';
        const optionId3 = '3';
     beforeEach(()=>{
     spyOn(localStorage, 'setItem');
  
            document.querySelector('.js-test-container').innerHTML = `
           <div class="js-checkout-header-middle-section"></div>
           <div class="js-order-summary"></div>
           <div class="js-payment-summary"></div>
           `;

            spyOn(localStorage, 'getItem').and.callFake(()=>{
          return JSON.stringify([
            {
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity:1
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 3
            }
          ]);
        });
    
        //console.log(localStorage.getItem('cart'));
        loadFromStorage();
        renderOrderSummary();
      });
      afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = '';
      })


  it('display the cart', ()=>{

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3');
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Intermediate Size Basketball');
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$10.90');
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toContain('$20.95');

        
        
         });
         it('remove a product', ()=>{
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        

         });
         it('updates delivery option',()=>{
          const productToUpdate = document.querySelector(`.js-delivey-option-${optionId3}-${productId1}`);
          productToUpdate.click();
          const optionInput = document.querySelector(`.js-delivery-option-input-${optionId3}-${productId1}`);
          console.log(optionInput);
          expect(optionInput.checked).toEqual(true);
          expect(cart.length).toEqual(2);
          expect(cart[0].productId).toEqual(productId1);
          expect(cart[0].deliveryOptionId).toEqual('3');
          const paymentSummary = document.querySelector('.js-payment-summary');
          expect(paymentSummary.innerText).toContain(`Shipping & handling:
$9.99`);
         expect(paymentSummary.innerText).toContain(`Order total:
$92.11`);
          
         })
            });
