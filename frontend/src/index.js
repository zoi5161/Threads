import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render(__dirname + "/pages/Home/home.ejs", {
        head_new: "Dành cho bạn"
    });
});

app.get('/Home/home.ejs', (req, res) => {
    res.render(__dirname + "/pages/Home/home.ejs", {
        head_new: "Dành cho bạn"
    });
});

app.get('/Announce/announce.ejs', (req, res) => {
    res.render(__dirname + "/pages/Announce/announce.ejs", {
        head_new: "Hoạt động"
    });
});

app.get('/Profile/profile.ejs', (req, res) => {
    res.render(__dirname + "/pages/Profile/profile.ejs", {
        head_new: "Hồ sơ"
    });
});

app.get('/Search/search.ejs', (req, res) => {
    res.render(__dirname + "/pages/Search/search.ejs", {
        head_new: "Tìm kiếm"
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});