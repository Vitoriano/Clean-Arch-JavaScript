import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

  it("Should get total of all orders", () => {

    const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
    const item2 = new OrderItem("i2", "p2", "Item 2", 100, 1);
    const item3 = new OrderItem("i3", "p3", "Item 3", 100, 1);

    const order1 = new Order("o1", "c1", [ item1 ]);
    const order2 = new Order("o1", "c1", [ item2 ]);
    const order3 = new Order("o1", "c1", [ item3 ]);

    const total = OrderService.total([order1, order2, order3]);

    expect(total).toBe(300);
  })

  it("Should place an order", () => {

    const customer = new Customer("1", "Customer 1");
    const item1 = new OrderItem("i1", "p1", "Item 1", 10, 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.reawardPoints).toBe(5);
    expect(order.total()).toBe(10);

   
  });

});