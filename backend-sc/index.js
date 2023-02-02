import express from "express";
import { fileURLToPath } from 'url';
import path from 'path'
import router from "./routes/index.js"; 
import cors from "cors";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '/views')))
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.listen(3003, () => {
  console.log("app listening on port 3003")
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("It's working!")
});
app.use('/api', router)
