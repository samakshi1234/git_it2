const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const ToDo = require('./models/todoschema.js');
const app=express();

app.use(express.urlencoded());
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');

app.get('/', function(req,res){

    ToDo.find({},function(err){
        if(err)
        {
            console.log('error in fetching todos from db');
            return;
        }
        return res.render('home',{
            todo_list:ToDo
        });
    });
   
});

 app.post('/createtodo',function(req,res){
    console.log(req.body);
    ToDo.create({
        worktodo :req.body.worktodo,
        date :req.body.date,
        category :req.body.category
    },function(err, newTodo){
        if(err){
            console.log('error in creating todo');
            return;
        }
        console.log('*****',newTodo);

        return res.redirect('back');
    });
});



app.listen(port, function(error){

    if(error)
    {
        console.log("error in creating a server :",error);
        return;
    }
       console.log("Server is running on a port", port);
});
