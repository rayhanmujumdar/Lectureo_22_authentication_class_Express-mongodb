const {model,Schema} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        minLength: [6,"Name is too short"],
        require: true
    },
    email: {
        type: String,
        validate: {
            validator: v => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v),
            message: (props) => `${props.value} is not valid` 
        },
        require: [true,"email is must be required"]
    },
    password: {
        type: String,
        minLength: [6,"Minimum requirement is 6 character"],
        require: [true,"password must be required"]
    },
    roles: {
        type: [String],
        default: ['STUDENT'],
        require: true
    },
    accountStatus: {
        type: String,
        enum: ["PENDING","ACTIVE","REJECT"],
        default: "PENDING",
        require: true
    }
})

const User = model('User',UserSchema)

module.exports = User