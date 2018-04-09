import mongoose from 'mongoose';

const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username:{
        type: String,
        require: true,
        minlength: [5, 'Username must be 5 characters or more.']
    },
    password:{
        type: String,
        require: true,
        minlength: [8, 'Password must be 8 characters or more.']
    },
    isDeleted: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});
//encryption logic for password

const User = mongoose.model('User',userSchema);
export default User;