import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("street", "123", "zipcode", "city");
customer.address = address;

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test find customer use case", () => {

  it("Should find a customer", async () => {

    const customerRepository = MockRepository();

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "street",
        city: "city",
        number: "123",
        zip: "zipcode"
      }
    };

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const result = await findCustomerUseCase.execute(input);

    expect(result).toEqual(output);
    

  });

  it("Should not find a customer", async () => {

    const customerRepository = MockRepository();

    customerRepository.find.mockImplementation(() => {
      throw Error("Customer not found");
    });

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123"
    };

    expect(() => {
      return findCustomerUseCase.execute(input);
    }).rejects.toThrow("Customer not found");
  });


});