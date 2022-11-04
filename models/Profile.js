const {model,Schema} = require('mongoose')

const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    firstName: {
        type: String,
        minLength: [3,"Minimum 3 character required"],
        maxLength: [30,"Maximum 30 character required"],
        require: [true,"first name must be required"]
    },
    lastName: {
        type: String,
        minLength: [3,"Minimum 3 character required"],
        maxLength: [30,"Maximum 30 character required"],
        require: [true,"last name must be required"]
    },
    phoneNo: {
        type:Number,
        maxLength: [11,"invalid number"],
        require: [true,"phone number must be required"]
    },
    avatar: {
        type: String,
        require: [true,"avatar url must be required"]
    },
})

const Profile = model("Profile",profileSchema)

module.exports = Profile