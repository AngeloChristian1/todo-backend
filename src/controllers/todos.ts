import express from 'express'
import {getTodoByTitle, createTodo, getTodo, getTodoById, deleteTodoById} from "../schema/todos"

export const addTodo = async (req: express.Request, res: express.Response) =>{
    try{
        const {title, content, isDone, date} = req.body;

        if(!title || !content || !isDone){
            return res.sendStatus(400);
        }

        const existingTodo = await getTodoByTitle(title)

        if(existingTodo){
            return res.sendStatus(400);
        }

        const todo = await createTodo({title, content, isDone, date})

        return res.status(200).json(todo).end()
    } catch(error){
        console.log('error', error);
        return res.sendStatus(400);
    }
}


export const getAllTodos = async (req:express.Request, res:express.Response)=>{
    try{
        const todos =await getTodo();
        return res.status(200).json(todos)
    } 
    catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteTodo = async (req:express.Request, res:express.Response)=>{
    try{

        const {id} = req.params;
        const deletedTodo = await deleteTodoById(id);

        return res.json(deletedTodo)
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}


export const updateTodo = async (req:express.Request, res:express.Response)=>{
    try{
        const {id} = req.params;
        const {title,content} = req.body;

        if(!title || !content){
            return res.sendStatus(400)
        }

        const todo = await getTodoById(id);

        todo.title = title;
        todo.content = content;
        await todo.save();
        return res.sendStatus(200).json(todo).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400); 
    }
}
 