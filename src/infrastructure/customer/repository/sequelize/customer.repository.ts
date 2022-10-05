import Address from "../../../../domain/customer/entity/address"
import Customer from "../../../../domain/customer/entity/customer"
import CustomerFactory from "../../../../domain/customer/factory/customer.factory"
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface"
import CustomerModel from "./customer.model"


export default class CustomerRepository implements CustomerRepositoryInterface{

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zipcode: entity.address.zipcode,
      active: entity.active,
      rewardsPoints: entity.reawardPoints
    })
  }

  async update(entity: Customer): Promise<void> {
   
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zipcode: entity.address.zipcode,
        active: entity.active,
        rewardsPoints: entity.reawardPoints
      },
      {
        where: {
          id: entity.id
        },
      }
    );
  }


 async find(id: string): Promise<Customer> {
  
  let  customerModel; 
  try {

    customerModel =  await CustomerModel.findOne(
      { 
        where: { id },
        rejectOnEmpty: true,
      });
      
  } catch (error) {
    throw new Error("Customer not found")
  }

  const customer =  new Customer (
   customerModel.id,
   customerModel.name
  );

  const address = new Address(
    customerModel.street,
    customerModel.number,
    customerModel.zipcode,
    customerModel.city
  );

  customer.address = address;

  return customer;
 }

  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();

    const output: Customer[] = []

     customersModel.map((customerModel) => {

      let outputAddress = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      output.push(
        CustomerFactory.listCustomerWithAddress(
        customerModel.name, 
        customerModel.id,
        outputAddress
      ))
     }
     
    );

    return output;
    
  }
  
}