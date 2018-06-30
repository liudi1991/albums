var express = require("express");
var router = require("./routers");

var app = express();


app.set("view engine", "ejs");

//静态中间件
app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname + "/uploads/"));
//首页
app.get("/", router.showIndex);

app.get("/:albumname", router.showAlbum);

app.get("/upload",router.showAdd);
app.post("/upload",router.doUpload);

app.get("/createAlbum",router.createAlbum);

app.post("/createAlbum",router.doCreateAlbum);
//404
app.use(router.show404);

app.listen(8000, "localhost");
