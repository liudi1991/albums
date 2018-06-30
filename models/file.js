
var fs = require("fs");

exports.getAllAlbums = function (callback) {

  fs.readdir("./uploads/", function (err, files) {
    if (err) {
      callback("没有找到uploads文件夹", null);
      return;
    }
    var albums = [];
    (function iterator(i) {
      if (i === files.length) {
        //console.log(albums);
        callback(null, albums);
        return;
      }
      fs.stat("./uploads/" + files[i], function (err, stats) {
        if (err) {
          console.log(err);
          callback("找不到文件" + files[i], null);
          return;
        }
        if (stats.isDirectory()) {
          albums.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0);
  }
  )
}

exports.getAlbumPicture = function (albumsName, callback) {

  fs.readdir("./uploads/" + albumsName, function (err, files) {
    if (err) {
      callback("没有找到uploads/" + albumsName + "文件夹", null);
      return;
    }
    var albumPictures = [];
    (function iterator(i) {
      if (i === files.length) {
        console.log(albumPictures);
        callback(null, albumPictures);
        return;
      }
      fs.stat("./uploads/" + albumsName +"/"+ files[i], function (err, stats) {
        if (err) {
          console.log(err);
          callback("找不到文件" + files[i], null);
          return;
        }
        if (stats.isFile()) {
          albumPictures.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0);
  }
  )
}