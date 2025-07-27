const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New user found: ", user);
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
