import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {

  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([CustomerModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("Should find a customer", async () => {

    const customer = new Customer("123", "John");
    const address = new Address("street", "123", "zipcode", "city");
    customer.address = address;

    const customerRepository = new CustomerRepository();

    await customerRepository.create(customer);

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


});