import Address from "../../../domain/customer/entity/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {

  private CustomerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {

    const customer = await this.CustomerRepository.find(input.id);

    customer.changeName(input.name);
    customer.address = new Address( 
      input.address.street,
      input.address.number,
      input.address.zip,
     input.address.city
    );

    await this.CustomerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zipcode,
        city: customer.address.city
      }
    }
  }
}