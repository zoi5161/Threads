import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import lastTime from "./public/js/service/lastTime.js";
import dotenv from "dotenv"
dotenv.config({ path: './config/.env' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const host_backend_domain = process.env.HOST_BACKEND || 'http://localhost:10000';
//console.log("check HOST_BACKEDN ENV: ", process.env.HOST_BACKEND);
//console.log("CHECK host: ", host_backend_domain);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const lastVisit = lastTime();
    res.redirect(`/${lastVisit}`);
});

app.get('/Login', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/login.ejs", {
        host_backend: host_backend_domain
    });
});

app.get('/Signup', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/signup.ejs", {
        host_backend: host_backend_domain
    });
});

app.get('/RecoverPass', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/recoverPass.ejs", {
        host_backend: host_backend_domain
    });
});

app.get('/UpdatePass', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/updatePass.ejs", {
        host_backend: host_backend_domain
    });
});

app.get('/Sendcode', (req, res) => {
    res.render(__dirname + "/pages/Authenticate/sendcode.ejs", {
        host_backend: host_backend_domain
    });
});

app.get('/Home', (req, res) => {
    res.render(__dirname + "/pages/Home/home.ejs", {
        head_new: "Dành cho bạn",
        host_backend: host_backend_domain
    });
});

app.get('/Comment', (req, res) => {
    res.render(__dirname + "/pages/Home/comment.ejs", {
        head_new: "Thread",
        host_backend: host_backend_domain
    });
});

app.get('/Announce', (req, res) => {
    res.render(__dirname + "/pages/Announce/announce.ejs", {
        head_new: "Hoạt động",
        host_backend: host_backend_domain
    });
});

app.get('/Profile', (req, res) => {
    res.render(__dirname + "/pages/Profile/profile.ejs", {
        head_new: "Trang cá nhân",
        host_backend: host_backend_domain
    });
});

app.get('/Search', (req, res) => {
    res.render(__dirname + "/pages/Search/search.ejs", {
        head_new: "Tìm kiếm",
        host_backend: host_backend_domain
    });
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
});