import mongoose from "mongoose";    

//1-create a schema
//2-create model based on that schema

const noteSchema=new mongoose.Schema({
    title:{
        type:String, 
        required:true
    },
    content:{
        type:String, 
        required:true
    },
   
},
{timestamps:true} //createdAt and updatedAt

);


const Note=mongoose.model("Note",noteSchema);
export default Note;
