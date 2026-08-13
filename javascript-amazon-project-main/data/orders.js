export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){
  if (order.errorMessage) return;
  orders.unshift(order);
  saveToStorage();
  console.log(orders);
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}

export function getOrder(orderId){
  let matchingItem;
  orders.forEach((order)=>{
    if (order.id === orderId) matchingItem = order;
  })
  return matchingItem;
}
export function getOrderProduct(productId, orderId){
  let matchingItem;
  let matchingOrder;
  orders.forEach((order)=>{
    if(order.id === orderId) matchingOrder = order
  })
  matchingOrder.products.forEach((orderProduct)=>{
    if (orderProduct.productId === productId) matchingItem = orderProduct;
  })
  return matchingItem;
}