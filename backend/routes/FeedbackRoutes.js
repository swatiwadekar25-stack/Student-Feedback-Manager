
import express from "express";
import{
    createFeedback,
    getAllFeedback,
    getFeedbackByID,
    updateFeedback,
    deleteFeedback
} from "../controllers/FeedbackController.js"

const router = express.Router();

//CREATE
router.post("/",createFeedback)

//READ ALL

router.get("/",getAllFeedback)

//READ ONE
router.get("/:id",getFeedbackByID)

//UPDATE

router.put("/:id",updateFeedback)

//DELETE

router.delete("/:id",deleteFeedback)



export default router;