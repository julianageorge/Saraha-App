import joi from "joi";
import { generalFields } from "../../middlewares/validation.middlewares.js";

export const updatePasswordSchema=joi.object({
    oldPassword:generalFields.password.required(),
    newPassword:generalFields.password.required()
}).required();





