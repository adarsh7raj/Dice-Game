const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

let playerBalance = 1000; 


function generateFairHash(serverSeed, clientSeed, nonce) {
    const hash = crypto.createHash("sha256");  // This will create a object of crypto hash it will not return anything
    hash.update(`${serverSeed}-${clientSeed}-${nonce}`);  // This will add a input to the hash object , this will not return anything.
    return hash.digest("hex");    // This will create the 16 character hash.
}
app.get("/",function(req,res){
    res.json({Meassage:"HI from the server"});
})
app.post("/roll-dice", function(req, res){
    const serverSeed = crypto.randomBytes(16).toString("hex"); // Server-side randomness , it will generate 32 character long string
    console.log(serverSeed);
    const nonce = Math.floor(Math.random() * 100000); // Unique identifier for roll

    const { betAmount, clientSeed } = req.body;
    if (betAmount > playerBalance || betAmount <= 0) {
        return res.status(400).json({ error: "Invalid bet amount" });
    }

  
    const hashedRoll = generateFairHash(serverSeed, clientSeed, nonce);
    const roll = parseInt(hashedRoll.substring(0, 1), 16) % 6 + 1; // First extract the first character of the hash after that parse it into Integer.
   console.log(roll);
   

    res.json({
        roll,
        betAmount,
        serverSeed,
        clientSeed,
        nonce,
        hashedRoll,
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
