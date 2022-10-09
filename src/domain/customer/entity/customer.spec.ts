import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

  it("Should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John")
    }).toThrowError("Customer: Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("124", "")
    }).toThrowError("");
  });

  it("Should throw error when id and name is empty", () => {
    expect(() => {
      let customer = new Customer("", "")
    }).toThrowError("Customer: Id is required,Customer: Name is required");
  });

  it("Should changing name", () => {

    let customer = new Customer("124", "John")
    customer.changeName("Jane");

    expect(customer.name).toBe("Jane");
  });

  it("Should activate customer", () => {

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "123", "59290-000", "Natal");

    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
    
  });

  it("Should deactivate a customer", () => {

    const customer = new Customer("1", "Customer 1");
    
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
    
  });

  it("Should throw error when address is undefined when you activate a customer", () => {

    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
    
  });

  it("Should add reward points", () => {

    const customer = new Customer("1", "Customer 1");
    expect(customer.reawardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.reawardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.reawardPoints).toBe(20);
    
  });

});