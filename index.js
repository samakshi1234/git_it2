const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const app=express();

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

app.get('/', function(req,res){
     return res.render('home');
});


app.listen(port, function(error){

    if(error)
    {
        console.log("error in creating a server :",error);
        return;
    }
       console.log("Server is running on a port", port);
});
