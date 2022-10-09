import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll( async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {

    const response = await request(app)
        .post("/customer")
        .send({
          name: "Jhon",
          address: {
            street: "street",
            number: "123",
            zipcode: "59290000",
            city: "city"
          }
        });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jhon");
  });

  it("Should not create a customer", async () => {
      const response = await request(app)
        .post("/customer")
        .send({
          name: "Jhon",
        });
        
      expect(response.status).toBe(500);
  });

  it("Should list all customers", async () => {

    const response = await request(app)
        .post("/customer")
        .send({
          name: "Jhon",
          address: {
            street: "street",
            number: "123",
            zipcode: "59290000",
            city: "city"
          }
        });

    expect(response.status).toBe(200);

    const response2 = await request(app)
        .post("/customer")
        .send({
          name: "Jane",
          address: {
            street: "street2",
            number: "1232",
            zipcode: "592900002",
            city: "city2"
          }
        });
    
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer1 = listResponse.body.customers[0];
    expect(customer1.name).toBe("Jhon");
    expect(customer1.address.street).toBe("street");

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("street2");

    const listResponseXML = await request(app)
    .get("/customer")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<name>Jhon</name>`);
    expect(listResponseXML.text).toContain(`</customers>`);
    

  });

});