const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')



app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hello World..!!')
})


app.post('/users', (req, res)=>{
    console.log('request', req.body)
    const user = req.body;
    user.id = users.length +1;
    users.push(user)
    res.send(user)
} )

const users = [
{id: 1, name: "Shorif Uddin", email: "shorifuddinuddin240915@gmail.com"},
{id: 2, name: "Arif Ahmad", email: "arifahmed@gmail.com"},
{id: 3, name: "Ahmae maih", email: "ahmedmiah@gmail.com"},
{id: 4, name: "Rokib Ahmed", email: "shorifuddinuddin@gmail.com"}
]

app.get('/users', (req, res)=>{
    res.send(users)
})

app.get('/user/:id', (req, res)=>{
    console.log(req.prams);
    const id = req.params.id;
    const user = users[id]
    res.send(user)
})

app.listen(port, ()=>{
    console.log('Listening to port', port);
})