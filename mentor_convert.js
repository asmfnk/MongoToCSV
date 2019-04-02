const {createObjectCsvWriter} = require('csv-writer');
var file = argv[2] || "Untitled.json"
var data = require( "./data/"+file );

const csvfilepath =  __dirname+'/data/'+file.split('.')[0]+'.csv'
const csvWriter = createObjectCsvWriter({
    path: csvfilepath,
    header: [
         {id: 'email', title: 'email'},
         {id: 'last_name', title: 'last_name'},
         {id: 'first_name', title: 'first_name'},
        //'name','lang' //Headerなしの場合
    ],
    encoding:'utf8',
    append :false, // append : no header if true
});

var output = data.map(function(d, i){
    if(d.name.lastName.indexOf(",") !== -1 || d.name.firstName.indexOf(",") !== -1){
        console.log(i+"行目カンマ入ってるよ！確認して！")
        console.log(d.name.lastName+d.name.firstName)
    }
    if(!d.name.lastName.trim() || !d.name.firstName.trim()){
        console.log(i+"行目空文字だよ！確認して！")
        console.log(d.name.lastName+d.name.firstName)
    }
    return {email: d.email, last_name: d.name.lastName, first_name: d.name.firstName}
})

//Write CSV file
csvWriter.writeRecords(output)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
