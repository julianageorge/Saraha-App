import joi from "joi";
import { generalFields } from "../../middlewares/validation.middlewares.js";

export const SendMessageschema= joi.object({
    content:joi.string().min(3).max(100),
    receiver:generalFields.ObjectId.required(),
    sender:generalFields.ObjectId
}).required();
export const GetMessagesSchema=joi.object({
    id:generalFields.ObjectId.required()
}).required();