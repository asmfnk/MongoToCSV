const {createObjectCsvWriter} = require('csv-writer');
var moment = require('moment');
var file = process.argv[2] || "Untitled.json"
var data = require( "./data/"+file );

const columns = [
    {id: 'email', title: 'email', func: null},
    {id: 'name.lastName', title: 'last_name', func: 'chkCommaEmp'},
    {id: 'name.firstName', title: 'first_name', func: 'chkCommaEmp'},
    {id: 'createdAt.$numberLong', title: 'created_at', func: null},
    //{id: 'lastLoginAt.$numberLong', title: 'last_login_at', func: null},
    {id: 'createdAt', title: 'created_at_fm', func: 'momentDisp'},
    //{id: 'lastLoginAt', title: 'last_login_at_jp', func: 'momentDisp'},
    // {id: 'gender', title: 'gender', func: 'ここの文字列は加工する関数（工事中）'},
]

const csvfilepath =  __dirname+'/data/'+file.split('.')[0]+'.csv'
const csvWriter = createObjectCsvWriter({
    path: csvfilepath,
    header: columns.map(function(column){
        return {id: column.title, title: column.title}
    }),
    encoding:'utf8',
    append :false, // append : no header if true
});

var output = data.map(function(d, i){
    var obj = {
        email: d.email,
        last_name: chkCommaEmp (d.name.lastName, i),
        first_name: chkCommaEmp (d.name.firstName, i),
        created_at: d.createdAt.$numberLong,
        //last_login_at: d.lastLoginAt.$numberLong,
        created_at_fm: momentDisp (d.createdAt.$numberLong),
        //last_login_at_jp: momentDisp (d.lastLoginAt.$numberLong),
    }
    return obj
    // return columns.map(function(v){
    //     if(v.func){
    //         return d[v.id]
    //         //return eval(v.func+'(d[v.id],i)')
    //     }else{
    //         return d[v.id]
    //     }
    // })
})

//Write CSV file
csvWriter.writeRecords(output)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

function chkCommaEmp (d, i){
    if(d.indexOf(",") !== -1){
        console.log(i+"行目カンマ入ってるよ！確認して！")
    }
    if(!d.trim()){
        console.log(i+"行目空文字だよ！確認して！")
    }
    return d
}
function momentDisp (d){
    var da = new Date(Number(d))
    return moment(da).format()
}