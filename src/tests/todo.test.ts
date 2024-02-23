import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import {app} from 'index'; // Replace this with the path to your Express app file
import { TodoModel } from 'schema/todos'; // Assuming you have a Todo model

chai.use(chaiHttp);
const expect = chai.expect;

describe('Todo API', () => {
  describe('POST /addTodo', () => {
    it('should add a new todo', async () => {
      const res = await chai
        .request(app)
        .post('/addTodo')
        .send({ title: 'Test Todo', content: 'Test Content', isDone: false });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('title', 'Test Todo');
      // Add more assertions as needed
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await chai
        .request(app)
        .post('/addTodo')
        .send({ title: 'Incomplete Todo' });
      expect(res).to.have.status(400);
      // Add more assertions as needed
    });

    // Add more test cases for other scenarios
  });

  // Add test cases for other endpoints like GET /getAllTodos, DELETE /deleteTodo, PUT /updateTodo
});
