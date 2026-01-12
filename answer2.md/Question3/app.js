import os from "os";
import fs from "fs/promises";


try {
  const freeMemory = os.freemem();
  const cpuCores = os.cpus().length;

  console.log("Free Memory:", freeMemory);
  console.log("Total CPU Cores:", cpuCores);
} catch (error) {
  console.error("Error reading OS info:", error);
}

async function fileOperations() {
  try {
  
    await fs.writeFile("data.txt", "Hello World");
    console.log("data.txt created");

    await fs.writeFile("Readme.md", "## This is first line in Readme");
    console.log("Readme.md created");

    const data = await fs.readFile("data.txt", "utf-8");
    console.log("Content of data.txt:");
    console.log(data);

    await fs.appendFile("data.txt", "\nThis is second line");
    console.log("Text appended to data.txt");

    await fs.unlink("Readme.md");
    console.log("Readme.md deleted");

  } catch (error) {
    console.error("File operation error:", error);
  }
}

fileOperations();
