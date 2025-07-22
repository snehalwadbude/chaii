import {asynchandler } from '../utils/asynchandler.js';
import {Apierror} from '../utils/apierror.js';

import {User} from '../models/user.model.js';
import { uploadonCloudinary } from '../utils/cloudinary.js';
import { Apiresponse } from '../utils/Apiresponse.js';


const registerUser = asynchandler(async (req, res) => {
   // get user details from frontend
   //validatetion = not empty
   //check if user already exixt :username , email
   //check for images, check for avatar
   //upload them to cloudinary , avatar
   //create a user object create entry in the db
   //remove password and refresh token field from response
   //check for user creation
   //return response 


const { fullname , email, username, password} =req.body
console.log("email:", email);
})

if(
   [fullname, email,username, password].some((field) => field?.trim() === " ")
) {
    throw new Apierror(400, "All fields are required");
}

 const existeduser = User.findOne({
   $or: [{username}  ,{email} ]
})

if(existeduser){
   throw new Apierror(409, "User with email or username already exists");
}

const avatarLocalPath= req.files?.avatar[0].path;

  const coverimagelocation = req.file?.coverimage[0]?.path
  if(!avatarLocalPath)
{
   throw new Apierror(400, "Avatar image is required");
  }

  const avatar=await uploadonCloudinary(avatarLocalPath)

  uploadonCloudinary(coverimagelocation)
  const coverimage = await uploadonCloudinary(coverimagelocation)

  if(avatar ){
   throw new Apierror(400, "Avatar image upload failed");
  }

 const user =await User.create({
   fullname ,

   avatar : avatar.url , 
   coverimage : coverimage?.url || "",
   email,
   password,
   username: username.toLowerCase()
})

const createdUser = await User.findByIdAndUpdate(user._id).select(
   "-password -refreshtoken"
)

if(!createdUser){
   throw new Apierror(500, "something went wrong while regestering a user");
}

return res.status(201).json(
   new Apiresponse(201 , createdUser, "user registered successfuly")
)




export { 
   registerUser , 
}