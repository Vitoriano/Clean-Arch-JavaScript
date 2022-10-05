import Customer from "../entity/customer";
import { v4 as uuid } from 'uuid';
import Address from "../entity/address";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.address = address;
    customer.activate();

    return customer;
  }

  public static listCustomerWithAddress(name: string, id: string , address: Address): Customer {
   
    const customerOutput =  new Customer (
      id,
      name
     );
   
     const addressOutput = new Address(
       address.street,
       address.number,
       address.zipcode,
       address.city
     );
   
     customerOutput.address = addressOutput;

     return customerOutput;
  }
}