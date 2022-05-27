const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.7bquc.mongodb.net:27017,cluster0-shard-00-01.7bquc.mongodb.net:27017,cluster0-shard-00-02.7bquc.mongodb.net:27017/?ssl=true&replicaSet=atlas-uw0a6t-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const serviceCollection = client.db('furnitureMart').collection('services');
        

        // getting services
        app.get('/services', async(req, res) => {
            const query={};
            const cursor=serviceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);

        });


        // getting single service
        app.get('/services/:id', async (req, res) => {
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const service=await serviceCollection.findOne(query);
            res.send(service);
        });


    }
    finally{


    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
   res.send('Hey, running last assignment!') 
});

app.listen(port, () => {
console.log('Listening on port',port);
})



