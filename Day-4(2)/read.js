const fs = require('fs');
const path = require('path');

const readFileData=()=>{
return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "Data.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject("Error: Unable to read Data.txt file.");
      } else {
        resolve(data);
      }
    });
});
}

module.exports = readFileData;