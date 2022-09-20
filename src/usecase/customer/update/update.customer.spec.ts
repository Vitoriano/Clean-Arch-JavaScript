import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Jhon", 
  new Address("street", "123", "zipcode", "city")
);

const input = {
  id: customer.id,
  name: "Jhon Updated",
  address: {
    street: "street updated",
    city: "city updated",
    number: "1234",
    zip: "zipcode updated"
  } 
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe("Unit test for customer update use case", () => {

  it("Should update a customer", async() => {

    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);

  });

});
