import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


    const uploadonCloudinary= async (localfilePath) => {
        try {
            if(!localfilePath) return null;
                // upload an image
              const response = await cloudinary.uploader.upload(localfilePath ,{
                    resource_type : "auto"
              })
            

               console.log(" file is Uploading to Cloudinary...",response.url);
               return response;
            
            
        } catch (error) {

            fs.unlinkSync(localfilePath); //remove the locally  saved tempory file as the upload operation got failrd
            return null;
        }
    }

    

export {uploadonCloudinary};