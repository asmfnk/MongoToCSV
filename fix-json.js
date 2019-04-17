var fs = require('fs');

var file = process.argv[2] || "Untitled.json"
var filename = require( "./data/"+file );

readFile(filename, function(){

});


writeFile("test.txt", "test OK!");

function fix_json(data) {

}

//ファイル読み込み関数
function readFile(path, callback) {
  fs.readFile(path, 'utf8', function (err, data) {

    //エラーの場合はエラーを投げてくれる
    if (err) {
        throw err;
    }
    
    return callback(data)
  });
}

//ファイルの書き込み関数
function writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
      if (err) {
          throw err;
      }
    });
  }
