const express=require('express');
const bodyParser = require('body-parser');
// const irs_route=require('./router/route')
const app =express();
const cors = require('cors');
const low =require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapters = new FileSync('data_db.json');
const db =low(adapters);

// var url = bodyParser.urlencoded({extended:false})

app.use(cors());
app.use(bodyParser.json())

app.get('/api', function(req, res){
    console.log('GET request');
    db.defaults({data:[]}).write()
    var y = db.get('data').value();
    res.send(y)
});

app.post('/api', function(req, res){
    // console.log(req.body);
    db.get('data').push({nama:req.body.nama,email:req.body.email,password:req.body.password}).write()
    res.send({
        status:'POST Berhasil',
        nama: req.body.nama,
        email:req.body.email,
        password:req.body.password
    });
})
// app.post('/api',(req,res)=>{
//     console.log(req.body);
//     res.send({ 
//                 type:'POST',
//                 nama:req.body.nama,
//                 usia:req.body.usia
//             });
// })

// app.put('/api/:id',(req,res)=>{
//     res.send({pesan:'ini PUT'});
// })

// app.delete('/api/:id',(req,res)=>{
//     res.send({pesan:'ini DELETE'});
// })

app.listen(3002);
console.log('listening to port 3002')