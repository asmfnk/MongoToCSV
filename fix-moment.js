const fs = require('fs');
const csv = require('csv');
var moment = require('moment');

const parser = csv.parse((error, data) => {

    //内容出力
    console.log('初期データ');

    //変換後の配列を格納
    let newData = data;

    newData.map((d)=> {
        d[0] = momentDisp(d[0])
        return d
    })

    //write
    csv.stringify(newData,(error,output)=>{
        fs.writeFile('./data/out.csv',output,(error)=>{
            console.log('処理データをCSV出力しました。');
        })
    })
})

//読み込みと処理を実行
fs.createReadStream('./data/tmp.csv').pipe(parser);


function momentDisp (d){
    if(Number(d) < 2) return d
    var da = new Date(Number(d))
    return moment(da).format()
}
