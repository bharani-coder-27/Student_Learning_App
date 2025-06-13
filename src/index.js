import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app=express();
const PORT=8800;

app.use(cors({
  origin: 'http:// 192.168.203.189:8800', // your frontend IP:port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use("/api",userRoutes);

app.get("/",(req,res)=>{
    res.send("Backend running Successfully....");
})

app.listen(PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`);
})




/* import express from "express";
import mysql, { createConnection } from "mysql2";
import cors from 'cors';
const app=express();

const db=createConnection({
    host: "localhost",
    user: "root",
    password: "Bharani@2324",
    database: "student_learning_app"
})

app.use(cors({
  origin: 'http://192.168.184.189:8800', // your frontend IP:port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())

app.get("/",(req,res)=> {
    res.json("Hey, this is backend server...");
})

app.get("/goal",(req,res)=> {
    const q="SELECT * FROM goal";
    db.query(q, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/user",(req,res)=>{
    const q="SELECT * FROM user";
    db.query(q, (err, data)=>{
        if(err) {
            console.log("Error occured while show the user details");
            return res.json(err);
        }
        return res.status(200).json(data);
    })
})

app.post("/user",(req,res)=>{
    const q="INSERT INTO user (`name`,`email`,`password`,`phone_no`,`dof`,`join_date`) VALUES (?)"
    const values=[
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phone_no,
        req.body.dob,
        req.body.join_date
    ]
    db.query(q,[values],(err,data)=>{
        if(err) {
            console.log("Error occured while inserting user: ",err);
            return res.status(400).json({success: false});
        }
        return res.status(201).json({success: true, msg: "Account Successfully Created"});
    })
})

app.listen(8800, ()=>{
    console.log("Backend connected successfully.");
}) */