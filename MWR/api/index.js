const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://khalil:khalil@cluster0.mgiy6ml.mongodb.net/").then(() => {
    console.log("connected to mongodb")
}).catch((error) => {
    console.log("error connected to mongodb", error)
})
app.listen(port, () => {
    console.log("server is running on port")
});
const User = require("./models/user");
const Todo = require("./models/todo");
const Tododaily =require("./models/tododaily");
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if the user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("user already exist");
        }
        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.status(202).json({ message: "user registred successfully" });
    } catch (error) {
        console.log("error registred", error);
        res.status(500).json({ message: "error message" });
    }
});


const generateSecretkey = () => {
    const secretkey = crypto.randomBytes(32).toString("hex");
    return secretkey;

};
const SecretKey = generateSecretkey();
const moment = require("moment");

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "wrong password" });
        }

        const token = jwt.sign({ userId: user._id }, SecretKey);
        res.status(200).json({ token });

    } catch (error) {
        console.log("error login", error);
        res.status(500).json({ message: "login faild" });
    }
});
app.post("/todos/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, category } = req.body;
        const newTodo = new Todo({
            title,
            category,
            dueDate: moment().format("YYYY-MM-DD"),
        });
        
        await newTodo.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user?.todos.push(newTodo._id);
        await user.save();
        res.status(202).json({ message: "todo added successfully", todo: newTodo });
    } catch (error) {
        console.log("error adding todo", error);
        res.status(200).json({ message: "error adding todo" });
    }
});

app.get("/users/:userId/todos", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate("todos");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ todos: user.todos });
    } catch (error) {
        console.log("error getting todos", error);
        res.status(500).json({ message: "error getting todos" });
    }
});
app.patch('/todos/:todoId/complete', async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
            status: "completed",

        }, { new: true });
        if(!updatedTodo){
            return res.status(404).json({message:"todo not found"})
        }
        res.status(200).json({message:"todo updated successfully",todo:updatedTodo});
    } catch (error) {
        console.log("error getting todos", error);
        res.status(500).json({ message: "something went wrong" });
    }
});
app.delete('/users/:userId/todos/:todoId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const todoId = req.params.todoId;

        // You may want to check if the user exists before proceeding
        // Assuming User is your model for users
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assuming Todo is your model for todos
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // You may want to remove the todo ID from the user's todos array
        user.todos.pull(todoId);
        await user.save();

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log("Error deleting todo", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

  //daily once

  app.post("/tododailies/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, category } = req.body;
        const newTodod = new Tododaily({
            title,
            category,
            dueDate: moment().format("YYYY-MM-DD"),
        });
        
        await newTodod.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user?.tododailies.push(newTodod._id);
        await user.save();
        res.status(202).json({ message: "todo added successfully", tododailies: newTodod });
    } catch (error) {
        console.log("error adding todo", error);
        res.status(200).json({ message: "error adding todo" });
    }
});

app.get("/users/:userId/tododailies", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate("tododailies");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ tododailies : user.tododailies });
    } catch (error) {
        console.log("error getting tododaily", error);
        res.status(500).json({ message: "error getting todos" });
    }
});
app.patch('/tododailies/:tododailiesId/complete', async (req, res) => {
    try {
        const todoIdd = req.params.tododailiesId;
        const updatedTodod = await Tododaily.findByIdAndUpdate(todoIdd, {
            status: "completed",

        }, { new: true });
        if(!updatedTodod){
            return res.status(404).json({message:"todo not found"})
        }
        res.status(200).json({message:"todo updated successfully",tododailies:updatedTodod});
    } catch (error) {
        console.log("error getting todos", error);
        res.status(500).json({ message: "something went wrong" });
    }
});
app.delete('/users/:userId/tododailies/:tododailiesId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const todoId = req.params.tododailiesId;

        // You may want to check if the user exists before proceeding
        // Assuming User is your model for users
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assuming Todo is your model for todos
        const deletedTodo = await Tododaily.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // You may want to remove the todo ID from the user's todos array
        user.tododailies.pull(todoId);
        await user.save();

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log("Error deleting todo", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
  