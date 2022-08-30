import Address from "../entity/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit test', () => { 

  it("Should create a new customer", () => {
    let customer = CustomerFactory.create("Jhoen");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhoen");
    expect(customer.address).toBeUndefined();
  })

  it("Should create a new customer with a address", () => {

    const address = new Address("Street 1", "123", "59290-000", "Natal");
    let customer = CustomerFactory.createWithAddress("Jhoen", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhoen");
    expect(customer.address).toBe(address);
    
  })
  
 })