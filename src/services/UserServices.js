const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const SendEmailUtility = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");

const UserOTPService = async(req,res)=> {

    try{
        let email=req.params.email;
        let code = Math.floor(100000+Math.random()*900000);
        let EmailText = `Your Verification Code is ${code}`;
        let EmailSubject = "Email verification";
        await SendEmailUtility(email, EmailText, EmailSubject);
    
        await UserModel.updateOne({email:email}, {$set:{otp:code}}, {upsert:true})
        return {status: "Sucess!", message: "6 Digit OTP has been sent!"}
    }catch(e){
        return {status: "Failed!", message: "Something went wrong!"}
    }
    

}

const VerifyOTPService = async(req,res)=> {

    try{
        let email=req.params.email;
        let otp=req.params.otp;
    
        //UserCount
        let total = await UserModel.find({email:email,otp:otp}).count("total");
        if(total===1){
            //User ID Read
            let user_id = await UserModel.find({email:email,otp:otp}).select('_id');
    
            //UserToken Create
            let token = EncodeToken(email, user_id[0]['_id'].toString())
    
            // OTP Code to 0
            await UserModel.updateOne({email:email}, {$set:{otp:0}})
    
            return {status: "Sucess!", message: "OTP Verification Complete!", token: token, userid: user_id}
    
    
        }else{
            return {status: "Failed!", message: "Invalid OTP"}
        }
    }catch(e){
        return {status: "Failed!", message: "Invalid OTP"}
    }


}


const SaveProfileService = async (req) => {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {status:"success", data:reqBody}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
 } 


const ReadProfileService = async (req) => {
    try {
        let user_id=req.headers.user_id;

        let result = await ProfileModel.find({userID: user_id})
        return {status:"Success!", message:result}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
 } 



module.exports={
    UserOTPService, VerifyOTPService, SaveProfileService, ReadProfileService
}