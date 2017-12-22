const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const { Client } = require('pg');
let _  = require('lodash');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});
var name1='Anupam';
var id='5';
var branch='IT';
let q = 'SELECT * from public.employees';

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
});

const app = express();

app.use(morgan('combined'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT  = 1000;
// app.get('/',function (req, res, next) {
//     console.log(req);
//     res.sendFile('./index.html',{root: __dirname });
// });

app.get('/files',function (req,res,next) {
    // res.header('hat-bhencho','Kya haal h').json({hello:'files access here'});
    client.query(q,function (err,response) {
        res.json(response.rows);
    })
});

app.post('/post',function (req, res, next) {
    let body = _.pick(req.body,'n','b','i');
    console.log(body);
    let name  = _.result(body,'n');
    let b = _.result(body,'b');
    let id = _.result(body,'i');
    let m = `INSERT INTO public.employees VALUES('${name}',DEFAULT,'${b}')`;
    client.query(m,function (err,response) {
        if(err)
            console.log(err);
        res.json({success:response});
    })
});
app.listen(PORT,function () {
   console.log(`Server is running on port ${PORT}`);
});