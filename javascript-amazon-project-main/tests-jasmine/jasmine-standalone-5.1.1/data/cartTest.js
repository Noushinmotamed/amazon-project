import { addToCart, cart, loadFromStorage, deleteItemQuantity, updateDeliveryOption } from "../../../data/cart.js";


describe('test suite: addToCart',()=>{
  beforeEach(()=>{
     spyOn(localStorage,'setItem').and
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([1,2,3]);
    });
     console.log(localStorage.getItem('cart'));
    loadFromStorage();
  });
  it('adds an existing product to cart',()=>{
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    expect(cart.length).toEqual(4)                  //making use setItem is being called
    expect(cart[3].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[3].quantity).toEqual(4);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));


  });
  it('adds a new product to the cart',()=>{
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    expect(cart.length).toEqual(4);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);                   //making use setItem is being called
    expect(cart[3].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[3].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
  });
});
describe('test suite: removeFromCart',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(()=>{
     spyOn(localStorage,'setItem');
     document.querySelector('.js-test-container').innerHTML = `
           <div class="js-checkout-header-middle-section"></div>
           <div class="js-order-summary"></div>
           <div class="js-payment-summary"></div>
           `;

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity: 2
      },
      {
        productId: productId2,
        quantity: 4
      }
    ]);
    });
     console.log(localStorage.getItem('cart'));
     console.log(cart);
    loadFromStorage();
  });
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
  });
  it('deletes an existing product',()=>{
     deleteItemQuantity(productId1);
     expect(cart.length).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toContain(productId2);
     expect(cart).toEqual([{
        productId: productId2,
        quantity: 4
      }]);
  });
  it('handles deleting a non existing product',()=>{
    deleteItemQuantity(productId1);
    deleteItemQuantity(productId1);
    expect(cart.length).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledTimes(2);
     expect(cart[0].productId).toContain(productId2);
     expect(cart).toEqual([{
        productId: productId2,
        quantity: 4
      }]);

  });
});
describe('test suite: updateDeliveryOption',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const optionId1 = '1';
  const optionId2 = '2';
  const optionId3 = '3';
  beforeEach(()=>{
     spyOn(localStorage,'setItem');
     document.querySelector('.js-test-container').innerHTML = `
           <div class="js-checkout-header-middle-section"></div>
           <div class="js-order-summary"></div>
           <div class="js-payment-summary"></div>
           `;

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
      },
      {
        productId: productId2,
        quantity: 4,
        deliveryOptionId: '3'
      }
    ]);
    });
    loadFromStorage();
    });
     afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
  });
   
    it('correctly updates delivery option',()=>{
      updateDeliveryOption(productId1,optionId2);
      expect(cart[0].deliveryOptionId).toContain('2');
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it('handles updating non existing product',()=>{
      updateDeliveryOption('id1',optionId2);
      expect(cart[0].deliveryOptionId).toEqual('3');
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
  

});