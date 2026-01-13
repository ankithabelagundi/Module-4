const express = require("express");
const os = require("os");
const dns = require("dns");
const readFileData = require("./read");

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileData();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/systemdetails", (req, res) => {
  const platform = os.platform();
  const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB";
  const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2) + " GB";
  const cpuModel = os.cpus()[0].model;
  const cpuCores = os.cpus().length; // Bonus

  res.json({
    platform,
    totalMemory,
    freeMemory,
    cpuModel,
    cpuCores
  });
});

app.get("/getip", (req, res) => {
  const hostname = "masaischool.com";

  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) {
      return res.status(500).json({ error: "DNS lookup failed" });
    }

    res.json({
      hostname,
      addresses 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
