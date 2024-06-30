const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./model/User')
const port = 5000
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://kannansrinivasanrs:root@cluster0.esxbmnq.mongodb.net/').then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        email: req.body.email,
        mobilenum: req.body.mobilenum
    }).then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(port, () => {
    console.log("Server is Running :",port);
})