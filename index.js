const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// PehmXEmojEFQE7Yv
// crud_recap

const uri =
  "mongodb+srv://crud_recap:PehmXEmojEFQE7Yv@cluster0.e3qys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // Database and collection setup
    const database = client.db("crud_recap");
    const usersCollection = database.collection("users");

    // GET <---------------------
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const users = await cursor.toArray();
      res.send(users);
    });

    // POST <---------------------
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New user found: ", user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // DELETE <---------------------
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Delete user with id: ", id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple crud server running...");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
