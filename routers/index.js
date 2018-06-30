var file = require("../models/file.js")
var formidable = require('formidable');
var datetime = require('node-datetime');
var path = require("path");
var fs = require("fs");

exports.showIndex = function (req, res, next) {
  file.getAllAlbums(function (err, albums) {
    if (err) {
      console.log(err);
      next();
      return;
    }
    res.render("index", {
      "albums": albums
    });
  });

}

exports.showAlbum = function (req, res, next) {
  var albumsName = req.params.albumname;
  file.getAlbumPicture(albumsName, function (err, albumPictures) {
    if (err) {
      console.log(err);
      next();
      return;
    }
    res.render("album", {
      "album": albumsName,
      "albumPictures": albumPictures
    });
  })
}
exports.showAdd = function (req, res, next) {

  file.getAllAlbums(function (err, albums) {
    if (err) {
      console.log(err);
      next();
      return;
    }
    res.render("add", {
      "albums": albums
    });
  });
}

exports.doUpload = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + "/../uploadstemp/");
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      next();
      return;
    }
    console.log(fields)
    console.log(files)
    var oldname = files.picture.path;
    var extname = path.extname(files.picture.name);
    var prename = path.parse(files.picture.name).name;
    var newname = "./uploads/" + fields.album + "/" + prename + datetime.create(new Date()).format("ymdHMS") + extname;
    
    fs.rename(oldname, newname, function (err) {
      if (err) {
        console.log(err);
        next();
        return;
      }
      console.log("上传成功")

      res.redirect("/");
    })

  });
}

exports.createAlbum = function (rep, res, next) {
  res.render("createAlbum");
}

exports.doCreateAlbum = function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var inputName = fields.albumName;
    fs.mkdir("./uploads/" + inputName,function(err){
      if(err){
        console.log(err);
        return;
      }
      res.redirect("/")
    })
  })
}
exports.show404 = function (req, res, next) {
  res.render("404");
}