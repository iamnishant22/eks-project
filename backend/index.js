const express = require("express");
const { Pool } = require("pg");
const app = express();
app.use(express.json());


const pool = new Pool({
host: process.env.DB_HOST,
user: "postgres",
password: "postgres",
database: "game"
});


app.post("/login", async (req, res) => {
const { username, password } = req.body;
const result = await pool.query(
"SELECT * FROM users WHERE username=$1 AND password=$2",
[username, password]
);
res.json({ success: result.rows.length > 0 });
});


app.post("/play", (req, res) => {
const guess = req.body.guess;
const number = Math.floor(Math.random() * 10) + 1;
res.json({ result: guess == number ? "🎉 You Win!" : "❌ Try Again", number });
});


app.listen(3000, () => console.log("Backend running"));
