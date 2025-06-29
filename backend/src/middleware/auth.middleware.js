import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
       return res.status(401).json({message:"Unauthorized - You must be logged in"})
    }
    next();
}


export const requireAdmin = async(req,res,next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        // console.log(process.env.ADMIN_EMAIL);
        // console.log(currentUser.primaryEmailAddress)
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress
        // console.log(isAdmin);
        if(!isAdmin){
            return res.status(403).json({message:"Unauthorized - you must be an admin"})
        }
        next();
    } catch (error) {
        next(error);
    }
}