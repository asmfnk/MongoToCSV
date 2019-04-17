# MongoToCSV
MongoDB compassから出力されるJSON（syntax error出てる……）をCSVにする

### Run
```
npm install
node convert.js {{./data/の中にあるファイル名}}
```
どうやらMongoDB compassから出力されるjsonは壊れているので、修復するには下記のコマンド
```
node fix-json.js {{./data/の中にあるファイル名}}
```
