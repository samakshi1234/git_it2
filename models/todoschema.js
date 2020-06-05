const mongoose=require('mongoose');

const todoSchema= new mongoose.Schema({
   
    worktodo:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    category:{
        type:String,
        required:true
    }


});

const ToDo = mongoose.model('ToDo', todoSchema);
module.exports=ToDo;
