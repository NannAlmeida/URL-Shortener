import mongoose from "mongoose";

const shortenerSchema = new mongoose.Schema({
    url: String,
    code: String,
    visits: Number
},
{
    collection: 'shortener'
});

export default shortenerSchema;