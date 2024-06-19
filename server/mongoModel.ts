import { Schema, model } from "mongoose";

   const linkSchema= new Schema({
      longUrl: {type: String, unique: true},
      shortUrl: {type: String, unique: true},
      Date: {type: Date, default: Date.now}
   });

   const Url= model('Url', linkSchema);
   export default Url;