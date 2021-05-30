const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Fruits = require("./models/Fruits");

const app = express();
const port = 3001 || process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://new-user:password1234@cluster0.n1zjl.mongodb.net/fruitsDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/insert", async (req, res) => {
  const { fruitsName, daysSinceIAte } = req.body;

  const fruits = new Fruits({
    fruitsName,
    daysSinceIAte,
  });
  try {
    await fruits.save();
    res.send("inserted fruits");
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  Fruits.find({}, (err, result) => {
    !err && res.send(result);
  });
});

app.delete("/delete/:fruitId", async (req, res) => {
  const { fruitId } = req.params;

  Fruits.deleteOne({ _id: fruitId }, (err) => {
    !err && res.send("Deleted successfully!!!");
  });
});

app.put("/update/:fruitId", async (req, res) => {
  const { fruitId } = req.params;
  const { fruitsName, daysSinceIAte} = req.body;

  Fruits.update({ _id: fruitId }, { fruitsName, daysSinceIAte }, { overwrite: true }, (err) => {
    !err && res.send("Updated successfully!!!");
  });
});

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
