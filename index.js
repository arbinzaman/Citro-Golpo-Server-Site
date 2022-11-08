const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require('dotenv').config();

// middle ware
app.use(cors());
app.use(express.json());

//Course Data
// const courses = require("./services.json");

// API Loading
// app.get("/services", (req, res) => {
//     res.send(courses);
// });



// mongodb



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0@cluster0.nj2hkmy.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://arbin:6R9SMiuPbMiQZGSm@cluster0.nj2hkmy.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db('ChitroGolpor').collection('services');

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

    }
    finally {

    }
};

run().catch(err => console.log(err));


// app.get("/service/:id", (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     const catagoryService = courses.find((item) => item._id == id);
//     // console.log(catagory_news);
//     res.send(catagoryService);
// });


// app.get("/service/:id", (req, res) => {
//     const id = req.params.id;
//     // console.log(id);
//     console.log(courses);
//     const selectedService = courses.find((item) => item._id == id);
//     console.log(selectedService);
//     res.send(selectedService);
// });

// Initial message
app.get("/", (req, res) => {
    res.send("Learn With Fun!");
});

app.listen(port, () => {
    console.log("Learn with Fun site running on port:", port);
});
