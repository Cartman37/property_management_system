const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'propertymanagement'
});

con.connect((err) => {
    if(err){
        console.error('Error connecting to Db: ' + err.toString());
        return;
    }
    console.log('Connection established');
});

//con.end((err) => {
//    console.error(err.toString());
//});