import { default as express } from "express";
import { readFile, writeFile } from "fs/promises";

const app = express();
const port = 3000;

app.use(express.static("web"));
app.use(express.json());

app.get("/zmones", async (req, res) => {
  res.type("application/json");
  try {
    const fZmones = await readFile("zmones.json", {
      encoding: "utf8"
    });
    res.send(fZmones);
  } catch (err) {
    res.send("[]");
  }
});
app.post("/zmones/add", async (req, res) => {
  const zmogus = req.body;
  res.type("application/json");
  try {
    const fZmones = await readFile("zmones.json", {
      encoding: "utf8"
    });
    const zmones = JSON.parse(fZmones);
    let nextId = 0;
    for (const z of zmones) {
      if (nextId < z.id) {
        nextId = z.id;
      }
    }
    nextId++;
    zmogus.id = nextId;
    zmones.push(zmogus);
    await writeFile("zmones.json", JSON.stringify(zmones), {
      encoding: "utf8"
    });
    res.send(zmogus);
  } catch (err) {
    res.send("null");
  }
});
app.delete("/zmones/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  res.type("application/json");
  try {
    const fZmones = await readFile("zmones.json", {
      encoding: "utf8"
    });
    const zmones = JSON.parse(fZmones);
    const index = zmones.findIndex(z => z.id === id);
    if (index >= 0) {
      zmones.splice(index, 1);
      await writeFile("zmones.json", JSON.stringify(zmones), {
        encoding: "utf8"
      });
    }
    res.send("null");
  } catch (err) {
    res.send("null");
  }
});
app.get("/zmones/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  res.type("application/json");
  try {
    const fZmones = await readFile("zmones.json", {
      encoding: "utf8"
    });
    const zmones = JSON.parse(fZmones);
    const zmogus = zmones.find(z => z.id === id);
    res.send(JSON.stringify(zmogus));
  } catch (err) {
    res.send("null");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
