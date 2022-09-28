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

});