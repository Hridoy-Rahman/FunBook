import Users from "../models/userModel";
import { hashString } from "../utils";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";

export const register = async (req, res, next)=>{

    const {firstName, lastName, email, password } = req.body;

    if(!(firstName || lastName || email || password)){
        next("Provide required Field")
        return;
    }

    try{
        const userExist = await Users.findOne({email})

        if(userExist){

            next("This email already exists ");
            return
        }

        const hashedPassword = await hashString(password);

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        //Verification email send

        sendVerificationEmail(user,res);


    }
    catch(error){
        console.log(error)

        res.status(404).json({message : error.message})

    }

}