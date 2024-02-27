import chai from "chai";
import chaiHttp from "chai-http";
import { expect, should } from "chai";
import "../src/index"
import {app} from "../src/index"
import { TodoModel } from "schema/todos";
import nock from "nock";

chai.use(chaiHttp)

// beforeEach(()=>{
//     console.log("Before hook");
// })
const baseUrl = `http://localhost:8080`
describe("API Testing", ()=>{
    should()
    // test welcome database
    it("Test Welcome API", (done)=>{
        chai.request(app)
        .get('/welcome')
        .end((err, res)=>{
            // res.should.have.status(200)
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            expect(res.body.message).to.be.equal("Welcome to my API");
            done()
        })

    })


})