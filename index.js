const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const ToDo = require('./models/todoschema.js');
const app=express();
// setting up express
app.use(express.urlencoded());
app.use(express.static('./assets'));
// setting up view
app.set('view engine','ejs');
app.set('views','./views');

// controller of home page
app.get('/', function(req,res){

    ToDo.find({},function(err, _yoTodo){
        if(err)
        {
            console.log('error in fetching todos from db');
            return;
        }
        return res.render('home',{
            todo_list:_yoTodo
        });
    });
   
});
// controller to add description
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
        return res.redirect('back');
    });
});
//  controller to delete a todo
app.get('/deletetodo', function(req, res){
   console.log(req.query);
   var id=req.query;
//   to check the number of tasks to be deleted
   var count=Object.keys(id).length;
   for(let i=0;i<count;i++)
   {
      ToDo.findByIdAndDelete(Object.keys(id)[i],function(err){
          if(err)
          console.log('error in deleting the task');
      })       
   }
   return res.redirect('back');
});


app.listen(port, function(error){

    if(error)
    {
        console.log("error in creating a server :",error);
        return;
    }
       console.log("Server is running on a port", port);
});
