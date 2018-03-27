const express=require('express');
const bodyParser = require('body-parser');
// const irs_route=require('./router/route')
const app =express();
const cors = require('cors');
const low =require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapters = new FileSync('data_db.json');
const db =low(adapters);

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

// var url = bodyParser.urlencoded({extended:false})

app.use(cors());
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user:'irsha.valdani.29@gmail.com',
        clientId:'67585310104-sdh6rjfqke1hrdibuufveqseu61khqcn.apps.googleusercontent.com',
        clientSecret:'f8zjCQ6GCJbs0zMQwxnxdcM5',
        refreshToken:'1/9250qIJOtP_96U-xw5YELqCTPLMlfQ7zEpXAZsb4QBU'
    }
})

app.get('/api', function(req, res){
    db.defaults({data:[]}).write()
    var y = db.get('data').value();
    console.log('GET request');
    res.send(y)
});

app.post('/api', function(req, res){
    console.log(req.body);
    // 
    var mailOptions={
        from:'irsha coba mail NodeJs <irsha.valdani.29@gmail.com>',
        to:req.body.email,
        subject:'Motivasi',
        html:'<h1>Selamat Bergabung Ke website kami!!<br/></h1><br/><b>ini detailnya: </b><ul><li>Nama :'+req.body.nama+'</li><li>email :'+req.body.email+'</li><li>password :'+req.body.password+'</li></ul><br/><img src="https://firebasestorage.googleapis.com/v0/b/fake-app-ca098.appspot.com/o/irs_foto%2Fexport483923832.jpg?alt=media&token=41132817-3dbe-47f0-a30f-fab81b8c873a"/>',
        attachments:[
            {
                filename:'irsdm.png',
                path:'https://firebasestorage.googleapis.com/v0/b/fake-app-ca098.appspot.com/o/irs_foto%2F415173d9-93b5-4435-b619-1f24ce429463.jpg?alt=media&token=658bf94c-012f-44b7-a058-c57c8bd09f91'
            }
        ]
    }
    transporter.sendMail(mailOptions,(err,res2)=>{
        if(err){
            // console.log(err);
            console.log('Error Gan');
            res.send('Error Gan');
        }else{
            db.get('data').push({nama:req.body.nama, email:req.body.email, password:req.body.password}).write()
            console.log('Sukses Gan');
            res.send('Email sukses terkirim');
        }
    })
})

app.post('/api', function(req, res){
    res.send(console.log('Data berhasil terkirim'));
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