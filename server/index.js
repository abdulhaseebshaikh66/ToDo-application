const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json())


//ROUTES//

// create a room 
app.post("/todos", async( req, res ) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *", 
            [description]
        );

        res.json(newTodo.rows[0]);
        
    } catch ( err ) {
        console.error( err.message );
    }
})

// get all rooms

app.get("/todos", async(req, res) => {
    try {
        const alltodos = await pool.query("SELECT * FROM todo");
        res.json(alltodos.rows);
    } catch ( err ) {
        console.error(req.message);
    }
})

// get a room

app.get("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [
            id
        ]);
        // console.log(req.params)
        res.json(todo.rows[0]);
    } catch(err){
        console.error(err.message);
    }
})

// update a room 

app.put("/todos/:id", async( req, res)=>{
    try{
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [
            description, id
        ]);
        res.json("Todo has been updated");
    } catch(err){
        console.error(err.message);
    }
})

// delete a room 

app.delete("/todos/:id", async( req, res)=>{
    try{
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [
            id
        ]);
        res.json("Todo was deleted!");
    } catch ( err ) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("Server has started on post 5000");
});