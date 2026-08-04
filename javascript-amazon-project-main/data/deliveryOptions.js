import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];
export function getDate(deliveryOption){
   return  dayjs().add(skipWeekend(deliveryOption.deliveryDays),'days').format('dddd, MMMM D');
  }
function skipWeekend(deliveryDays){
  let today = dayjs();
  let oldDeliveryDays = deliveryDays;
  let newDeliveryDays = oldDeliveryDays;
  while( oldDeliveryDays !=0){
    today = today.add(1,'day');
    if (today.format('dddd') === 'Saturday' || today.format('dddd') === 'Sunday') {
      newDeliveryDays ++;
      continue;
    }
    oldDeliveryDays --;
  }
return newDeliveryDays;
}