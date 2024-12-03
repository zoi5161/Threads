import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import lastTime from "./public/js/service/lastTime.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const lastVisit = lastTime();
    res.redirect(`/${lastVisit}`);
});

app.get('/Login', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/login.ejs");
});

app.get('/Signup', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/signup.ejs");
});

app.get('/Sendcode', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/sendcode.ejs");
});

app.get('/Home', (req, res) => {
    res.render(__dirname + "/pages/Home/home.ejs", {
        head_new: "Dành cho bạn"
    });
});

app.get('/Comment', (req, res) => {
    res.render(__dirname + "/pages/Home/comment.ejs", {
        head_new: "Thread"
    });
});

app.get('/Announce', (req, res) => {
    res.render(__dirname + "/pages/Announce/announce.ejs", {
        head_new: "Hoạt động"
    });
});

app.get('/Profile', (req, res) => {
    res.render(__dirname + "/pages/Profile/profile.ejs", {
        head_new: "Trang cá nhân"
    });
});

app.get('/Search', (req, res) => {
    res.render(__dirname + "/pages/Search/search.ejs", {
        head_new: "Tìm kiếm"
    });
});

app.get('/profile_user', (req, res) => {
    res.render(__dirname + "/pages/Profile/Profile_post.ejs", {
        head_new: "Trôn Việt Lam"
    });
})
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});