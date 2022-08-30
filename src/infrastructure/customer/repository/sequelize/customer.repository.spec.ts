import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe('Customer repository test', () => { 

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

  it("should create a customer", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1","1",  "Brasil", "59290-000");
    customer.address = address;
    customer.activate();
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123"}})
    
    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardsPoints: customer.reawardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipcode,
      city: customer.address.city
    })
  });

  // it("Should update a product", async () => {

  //   const productRepository = new ProductRepository();
  //   const product = new Product("1", "Product 1", 100);

  //   await productRepository.create(product);

  //   const productModel = await ProductModel.findOne({ where: { id: "1"}});

  //   expect(productModel.toJSON()).toStrictEqual({
  //     id: "1",
  //     name: "Product 1",
  //     price: 100,
  //   });

  //   product.changeName("Product 2");
  //   product.changePrice(200);

  //   await productRepository.update(product);

  //   const productModel2 = await ProductModel.findOne({ where: { id: "1"}});

  //   expect(productModel2.toJSON()).toStrictEqual({
  //     id: "1",
  //     name: "Product 2",
  //     price: 200,
  //   });
  // });


  // it("should find a product", async () => {
  //   const productRepository = new ProductRepository();
  //   const product = new Product("1", "Product 1", 100);

  //   await productRepository.create(product);

  //   const productModel = await ProductModel.findOne({ where: { id: "1" } });

  //   const foundProduct = await productRepository.find("1");

  //   expect(productModel.toJSON()).toStrictEqual({
  //     id: foundProduct.id,
  //     name: foundProduct.name,
  //     price: foundProduct.price,
  //   });
  // });

  // it("should find all products", async () => {

  //   const productRepository = new ProductRepository();
  //   const product = new Product("1", "Product 1", 100);
  //   await productRepository.create(product);

  //   const product2 = new Product("2", "Product 2", 200);
  //   await productRepository.create(product2);

  //   const foundProducts = await productRepository.findAll();
  //   const products = [ product, product2];

  //   expect(products).toEqual(foundProducts);
   
  // });



 });