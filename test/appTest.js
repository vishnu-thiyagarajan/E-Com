const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');

chai.should()
chai.use(chaiHttp);

describe('Test Category', ()=>{
    it("It Should get all categories", (done)=>{
        chai.request(server).get("/categorys").end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a('array');
            response.body.length.should.be.eq(3);
        done();
        })
    })
    it("It Should not get all categories", (done)=>{
        chai.request(server).get("/category").end((err,response)=>{
            response.should.have.status(404)
        done();
        })
    })
})

describe('Test Product', ()=>{
    it("It Should get all products", (done)=>{
        chai.request(server).get("/products").end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a('array');
            response.body.length.should.be.eq(2);
        done();
        })
    })
    it("It Should not get all products", (done)=>{
        chai.request(server).get("/product").end((err,response)=>{
            response.should.have.status(404)
        done();
        })
    })
    it("It Should get all products for specific category", (done)=>{
        chai.request(server).get("/products/5f230e8602dd2e3e75852302").end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a('array');
            response.body.length.should.be.eq(1);
        done();
        })
    })
})

describe('Test Cart', ()=>{
    it("It Should get cart for specific user", (done)=>{
        chai.request(server).get("/carts").set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZjIyZjE5MjVkYjYwZjJiNGMzZmFkMGIiLCJpYXQiOjE1OTYxMjcxNDZ9.hLyfl5uNalRl7YhArP6Ct3hntktaO1_5_QcTdmBtwVs')
        .end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a('array');
            response.body.length.should.be.eq(2);
        done();
        })
    })
    it("It Should not get cart for specific user", (done)=>{
        chai.request(server).get("/carts")
        .end((err,response)=>{
            response.should.have.status(401)
        done();
        })
    })
    it("It Should add a product to specific user", (done)=>{
        const body = {
                        "product": {
                                "_id": "5f2311a9e43d104183dc2f86",
                                "category": {
                                    "_id": "5f230e8602dd2e3e75852302",
                                    "name": "T-Shirt",
                                    "type": "clothing",
                                    "createdAt": "2020-07-30T18:16:38.368Z",
                                    "updatedAt": "2020-07-30T18:16:38.368Z",
                                    "__v": 0
                                },
                                "name": "Red T-shirt",
                                "description": "High quality",
                                "price": 400.5,
                                "make": 2020,
                                "createdAt": "2020-07-30T18:30:01.351Z",
                                "updatedAt": "2020-07-30T18:30:01.351Z",
                                "__v": 0
                            },
                        "quantity": 2
                    }
        chai.request(server).post("/carts/add").send(body).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZjIzYzAyZjUzOGRhYzI0YTc4NTY0YjkiLCJpYXQiOjE1OTYxNzg0OTF9.-zHU-vwkyJz9D5CgxSRG1LrAQM95534HuJviPBjcdt8')
        .end((err,response)=>{
            response.should.have.status(200)
            response.text.should.be.eq('"Product added in cart!"');
        done();
        })
    })
})

describe('Test login', ()=>{
    it("It Should login for valid user details", (done)=>{
        const body = {
            "username": "user",
            "password": "user"
            }
        chai.request(server).post("/users").send(body).end((err,response)=>{
            response.should.have.status(200)
            response.body.should.be.a('object');
            response.body.should.have.property('accessToken');
            response.body.should.have.property('loggedUser');
            response.body.should.have.property('userID');
            response.body.should.have.property('loggedUser').eq(body.username);
        done();
        })
    })
    it("It Should not login for invalid user details", (done)=>{
        const body = {
            "username": "baduser",
            "password": "baduser"
            }
        chai.request(server).post("/users").send(body).end((err,response)=>{
            response.should.have.status(404)
        done();
        })
    })
})