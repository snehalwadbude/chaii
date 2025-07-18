import mongoose , {Schema} from "mongoose";

import mongoosezAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const videoSchema  = new mongoose.Schema({

    videofile:{
        type : String,
        required:true

    },
    thumbnail:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    duration:{
        type: Number,
        required: true


    },
    views:{
        type:Number,
        default:0
    },
    Ispublished:{
        type:Boolean,
        default : true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

},{timestamps : true})

videoSchema.plugin(mongoosezAggregatePaginate);

export const Video = mongoose.model('Video', videoSchema);