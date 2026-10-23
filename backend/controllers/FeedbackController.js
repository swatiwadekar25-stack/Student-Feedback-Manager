import Feedback from "../models/Feedback.js";


//CREATE
export const createFeedback =async (req,res)=>{
    try{
        const feedback =await Feedback.create(req.body);
        res.status(201).json({
            message:"Feedback created successfully",
            feedback
        })
    }
    catch(error){
        res.status(500).json({
            message:"Error creating feedback",
            error:error.message
        })
    }
}


//READ

export const getFeedbackByID = async (req,res)=>{
    try{
        const feedback = await Feedback.findById(req.params.id)
        
        if(!feedback){
            return res.status(404).json({
                message:"Feedback not found"
            })
        }
    res.status(200).json(feedback);

    }catch(error){
         res.status(500).json({
            message:"Error getting feedback",
            error:error.message
         })
    }
}


//All FEEDBACK
export const getAllFeedback =async (req,res)=>{
    try{
        const feedback = await Feedback.find()
        res.status(200).json(feedback)
    }catch(error){
       res.status(500).json({
        message:"Error getting feedback",
        error:error.message
       })
    }
}
//UPDATE

export const updateFeedback = async(req,res)=>{
    try{
        const feedback = await Feedback.findByIDAndUpdate(
            req.params.id,
            req.body,
        {new:true}
    )
    if(!feedback){
        return res.status(404).json({
            message:"Feedback not found"
        })
    }res.status(200).json({
        message:"Feedback Updated successfully",
        feedback
    })
    }
    catch(error){
        res.status(500).json({
            message:"Error Updating feedback",
            error:error.message
        })
    }
}

// DELETE

export const deleteFeedback =async(req,res)=>{
    try{
        const feedback = await Feedback.findByIdAndDelete(req.params.id)
        if(!feedback){
            return res.status(404).json({
                message:"Feedback not found"
            })
        }
        res.status(200).json({
            message:"Feedback deleted successfully"
        })
    }catch(error){
                res.status(500).json({
            message:"Error deleting feedback",
            error:error.message
        })

    }
}

