const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7bquc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const serviceCollection = client.db('furnitureMart').collection('services');
        
        app.get('/services', async(req, res) => {
            const query={};
            const cursor=serviceCollection.find(query);
            const services=await cursor.toArray();
            res.send(services);

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



