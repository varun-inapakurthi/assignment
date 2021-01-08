const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    typeOfUser: {
        type: String,
        enum: ['buyer', 'seller']
    }
},
    {
        timestamps: true
    })
userSchema.methods.toJSON = function (enteredPassword) {
    const user = this;
    const userObj = user.toObject()
    delete userObj.password;
    return userObj
}
userSchema.methods.matchPasssword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model('User', userSchema);

module.exports = User;