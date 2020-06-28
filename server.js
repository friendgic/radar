var express = require("express");
var port = 1224;
var app = express(); 
var bodyParser = require("body-parser");
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, './public/'))); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
  console.log("server runs on port " + port); 
});

app.get('/', function (req, res) {
  res.render('mypage.html') 
}) 

var mx,my,enemyLength
var enemy=[]
var passid = 0;

app.post('/CMD', function (req, res) {
    var dat = req.body
    //console.log(dat);
    if(dat['CMD']==='Refresh'){
      enemy=[]
      mx = dat['mx']
      my = dat['my']
      enemyLength = parseFloat(dat['enemylength'])
      //console.log('el:'+enemyLength)
      
      for(var i=0;i<enemyLength;i++){
        var ex = dat['ex'+i]
        var ey = dat['ey'+i]
        var eT = dat['eT'+i]
        var er = dat['er'+i]
        var ei = dat['ei'+i]
        enemy.push({id:i,ex:ex,ey:ey,eT:eT,er:er,ei:ei})
      }

      //console.log(enemy)

      res.send({data:0})
    }

    if(dat['CMD']=='Fetch'){
      if(dat['passID']==passid){
        //console.log('pass')
        res.send({mx:mx,my:my,enemy:enemy})
      }
      else{
        //console.log('notpass')
        res.send({mx:0,my:0,enemy:[]})
      }
    }

    if(dat['CMD']=='addpassid'){
      passid++;
      //console.log('pass ++ '+passid)
      res.send({passID:passid})
    }
    
  }
)