import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: false},
    picture: {type: String, required: false},
    isadmin: {type: Boolean, default: false}
})

const User = mongoose.model('User', UserSchema);
export default User;