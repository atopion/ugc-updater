const { exec } = require("child_process");

const express = require("express");
const app = express();

app.post("/", async (req, res) => {
    console.log("Incoming update request, comming from:", req.ip);
    
    update();

    res.status(200).send("OK");
});

const server = app.listen(4499, () => {
    console.log("Update server is running on port 4499.");
});

async function update() {
    const cmd = (process.platform === "win32" ? ".\\updater.sh" : "./updater.sh > log.txt 2> error.txt");
    await new Promise((resolve, reject) =>  {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error("Error occured during update: \n", err);
                console.log("LOG: ", stderr);
                reject();
            } else {
                console.log("Update finished successfully.");
                console.log("LOG: ", stdout);
                resolve();
            }
        });
    });
}

// For testing.
module.exports = server;