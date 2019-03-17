
const request = require("supertest");
const {Product} = require("../../models/products");

let server;
describe("/api/products", () => {
    beforeEach(() => {server = require("../../index");});
    afterEach(async () => {
        server.close();
        await Product.remove({});
    });
    describe("GET", () => {
        it("should return all products ", async () => {
            //insert fake data into DB ( 2 products)
            await Product.collection.insertMany([
                {name: "product1", category:"Men"},
                {name: "product2", category:"Women"},
            ]);
            //call the api
            const res = await request(server).get("/api/products");

            //assert the returned values/data (2 products)
           expect(res.status).toBe(200);
           expect(res.body.length).toBe(2);
           console.log(res.body);
           expect(res.body.some(p => p.category === "Women")).toBeTruthy();
            //clear data
        })
        it("should return one product with given id", async () => {
            //insert fake data into DB ( 2 products)
            const product = new Product( {name: "product1", category:"Men"});
            await product.save();
            //call 
            const res = await request(server).get("/api/products/"+product._id);
            //assert
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({name:"product1"});
        })
        it("Should return bad request error when the parameter passed is not correct", () => {
            const res = await request(server).get("/api/products/"+some fake value._id);

            
            expect(res.status).toBe(400);
        })
     } )
})