const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());





// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0@cluster0.nj2hkmy.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://arbin:6R9SMiuPbMiQZGSm@cluster0.nj2hkmy.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db('ChitroGolpor').collection('services');
        const reviewCollection = client.db("ChitroGolpor").collection("userreviews");
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


        app.get("/servicesforhome", async (req, res) => {
            const query = {};
            const cursor = await userCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });

        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = await userCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.post("/services", async (req, res) => {
            const review = req.body;
            const result = await userCollection.insertOne(review);
            res.send(result);
        });
        app.post("/reviews", async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        app.delete ("/reviews/:id",async(req,res)=>{
            const id = req.params.id;
            const query ={_id:ObjectId(id)}
            const result =await reviewCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        });


        app.patch('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body.status
            const query = { _id: ObjectId(id) }
            const updatedDoc = {
                $set:{
                    status: status
                }
            }
            const result = await orderCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        app.get("/reviews", async (req, res) => {
            const query = {};
            const cursor = await reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
    }
    finally {

    }
};

run().catch(err => console.log(err));





// Initial message
app.get("/", (req, res) => {
    res.send("Learn With Fun!");
});

app.listen(port, () => {
    console.log("Learn with Fun site running on port:", port);
});
