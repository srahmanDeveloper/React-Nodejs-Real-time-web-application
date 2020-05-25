// server.js

const express = require('express'),
    fileUpload = require('express-fileupload'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');


const productRoute = require('./routes/product.route');
//const liveChatRoute = require('./routes/liveChat.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/product', productRoute);
//app.use('/liveChat', liveChatRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
const fs = require("fs");

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : 'C:/Users/saif/OnlineProductShop/API/temp/'
}));
const imageUploadDir = 'C:/Users/saif/OnlineProductShop/src/assets/upload/';

app.post('/product/upload/', function(req, res) {
  
  //console.log(req); // list of the files
  //console.log(req); // request body, like email

  let file = req.files;
  //console.log(req.body.ComponentId);
  //console.log(file.Image.tempFilePath);
    setTimeout(function(){

        var jpegData = fs.readFileSync(file.Image.tempFilePath);
        fs.writeFile(imageUploadDir + req.body.ComponentId +'.png', jpegData,function(err, result) {
             if(err) console.log('error', err);
           });
        //console.log(jpegData);

    },500);
    

  return res.json({ success: true });
});



//let express = require('express')
//let app = express();

let http = require('http');
//let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

//const port = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        
        console.log('Live chat message');

        io.emit('new-message', message);
    });

    socket.on('new-product', (message) => {
        console.log('New Product added.');
        io.emit('new-product', message);

    });
});
