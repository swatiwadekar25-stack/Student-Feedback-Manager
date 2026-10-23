import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    course:{
        type:String
    },
    year:{
        type:String
    },
    semester:{
        type:String
    },
    batch:{
        type:String
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},
   {
    timestamps:true
    }
)

const Feedback = mongoose.model("feedback",feedbackSchema);
export default Feedback;