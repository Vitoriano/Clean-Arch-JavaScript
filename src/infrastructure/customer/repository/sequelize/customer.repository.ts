import Address from "../../../../domain/customer/entity/address"
import Customer from "../../../../domain/customer/entity/customer"
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
    throw Error("Method not implemented")
    // await ProductModel.update(
    //   {
    //     name: entity.name,
    //     price: entity.price
    //   },
    //   {
    //     where: {
    //       id: entity.id
    //     },
    //   }
    // );
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
    throw Error("Method not implemented")
    // const productsModels = await ProductModel.findAll();

    // return productsModels.map((productModel) => 
    //   new Product(productModel.id, productModel.name, productModel.price)
    // );
  }
}