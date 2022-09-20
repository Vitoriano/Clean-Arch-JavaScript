import Address from "../../domain/customer/entity/address";
import CustomerFactory from "../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";


const customer1 = CustomerFactory.createWithAddress(
  "Jhon", 
  new Address("street", "123", "zipcode", "city")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane", 
  new Address("street2", "1232", "zipcode2", "city2")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    find: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test customer listing use case", () => {

  it("Should list a customer ", async () => {
    
    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
  });

});