import { Product, Clothing, Appliance } from "../../../data/products.js"

describe('test suit: Product class',()=>{
  const produdctDetails = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  };
  it('generates product object',()=>{
    const object1 = new Product(produdctDetails);
    expect(object1.getId()).toEqual(produdctDetails.id);
    expect(object1.getName()).toEqual(produdctDetails.name);
    expect(object1.getCount()).toEqual(produdctDetails.rating.count);
   expect(object1.getImageUrl()).toEqual(produdctDetails.image);
   expect(object1.extraInfoHTML()).toEqual('');
    
  })
});
describe('test suite: Clothing',()=>{
  const produdctDetails = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  };
  it('generate clothing object',()=>{
    const object1 = new Clothing(produdctDetails);
    expect(object1.getId()).toEqual(produdctDetails.id);
    expect(object1.getName()).toEqual(produdctDetails.name);
    expect(object1.getCount()).toEqual(produdctDetails.rating.count);
    expect(object1.getImageUrl()).toEqual(produdctDetails.image);
    expect(object1.extraInfoHTML()).toEqual(`
    <a href="${produdctDetails.sizeChartLink}" target="_blank">Size chart</a>
    `);
    expect(object1.sizeChartLink).toContain(produdctDetails.sizeChartLink);
  })

});
describe('test suit: Appliance class',()=>{
  const productDetails = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: "appliance",
    instructionLink: "images/appliance-instructions.png",
    warrantLink: "images/appliance-warranty.png"
  };
  it('generates appliance object',()=>{
    const object1 = new Appliance(productDetails);
    expect(object1.getId()).toEqual(productDetails.id);
    expect(object1.getName()).toEqual(productDetails.name);
    expect(object1.getCount()).toEqual(productDetails.rating.count);
    expect(object1.getImageUrl()).toEqual(productDetails.image);
    expect(object1.extraInfoHTML()).toContain(productDetails.instructionLink);
    expect(object1.extraInfoHTML()).toContain(productDetails.warrantLink);
  })
})