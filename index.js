'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/cf_test', 
                 { useNewUrlParser: true }, 
                 (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('MongoDB DataBase runnig');
        app.listen(port, function(){
            console.log("Server API listening on http://localhost:" + port);
        });
    }
});


const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')

const credentials = require('./service-account.json')

const SPREADSHEET_ID = `1NPQlqMeuzD3lg5SL_PmlFtEQPKye-u7V7gdIjf6iso0`
async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  await promisify(doc.useServiceAccountAuth)(credentials)
  const info = await promisify(doc.getInfo)()
  console.log(`Loaded doc: ` + info.title + ` by ` + info.author.email)
  const sheet = info.worksheets[0]
  console.log(
    `sheet 1: ` + sheet.title + ` ` + sheet.rowCount + `x` + sheet.colCount
  )
}

accessSpreadsheet()