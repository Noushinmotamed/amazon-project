import { formatCurrency } from "../../../scripts/utils/money.js";

describe('tset Suite : FormatCurrency',()=>{
  it('converts cents into dollars', ()=> {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('works with 0',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('rounds up to closest number',()=>{
    expect(formatCurrency(2000.4)).toEqual('20.00');
    expect(formatCurrency(2000.6)).toEqual('20.01');
  });
  it('Works all the same with negetive',()=>{
    expect(formatCurrency(-2095)).toEqual('-20.95');
    expect(formatCurrency(-0)).toEqual('0.00');
    expect(formatCurrency(-2000.4)).toEqual('-20.00');
    expect(formatCurrency(-2000.6)).toEqual('-20.01');
    
  })
});