const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oxpn3wu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const ServiceCollection = client.db("socialMedia").collection("service")

        app.get("/service", async (req, res)=>{
            const query ={};
            const cursor = ServiceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
            
        })

       
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await ServiceCollection.findOne(query);
            res.send(services);
        });

        //  Add New
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await ServiceCollection.insertOne(newService);
            res.send(result);
        })

        // Update
        app.put("/service/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: data,
            };
            const result = await ServiceCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
        });

        // Delate
        app.delete('/service/:id',async (req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await ServiceCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally { }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('socialApp')
})

app.listen(port, () => {
    console.log("server is Running");
});