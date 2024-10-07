import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const todos = [
    {
        id: 1,
        name: 'Todo 1',
        completed: false
    },
    {
        id: 2,
        name: 'Todo 2',
        completed: false
    },
    {
        id: 3,
        name: 'Todo 3',
        completed: false
    }
]

app.get('/', (req, res) => {
    res.json({ message: 'Todo List Home Page' })
})

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id == id);
    res.json({message: "1 Todo", data:todo});
})

//Get,post,put,delete,patch

app.post('/todos', (req, res) => {
    const todo = req.body;
    if(todo) {
        todos.push(todo);
        res.json({message: 'Todo added', data: todo});
    }else {
        res.status(400).json({message: 'Error adding todo'});
    }
})

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id == id);
    if(todo){
     todo.name = req.body.name;
        todo.completed = req.body.completed;
        res.json({message: 'Todo updated', data: todo});
    } else {
        res.status(404).json({message: 'Todo not found'});
    }
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id == id);
    if(index > -1){
        todos.splice(index, 1);
        res.json({message: 'Todo deleted'});
    }else {
        res.status(404).json({message: 'Todo not found'});
    }
})


app.listen(5000, () => {
    console.log('Server is running on port 5000')
})