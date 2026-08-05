import { addToCart, cart, loadFromStorage } from "../../../data/cart.js";


describe('test suite: addToCart',()=>{
  it('adds an existing product to cart',()=>{
   spyOn(localStorage,'setItem').and
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([1,2,3]);
    });
     console.log(localStorage.getItem('cart'));
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    expect(cart.length).toEqual(4)                
    expect(cart[3].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[3].quantity).toEqual(4);

  });
  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem').and
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([1,2,3]);
    });
     console.log(localStorage.getItem('cart'));
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2);
    expect(cart.length).toEqual(4);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);                   //making use setItem is being called
    expect(cart[3].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[3].quantity).toEqual(2);
  });
});