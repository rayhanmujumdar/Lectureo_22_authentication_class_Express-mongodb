const {Schema,model} = require("mongoose")

const adminAttendanceSchema = new Schema({
    timeLimit: Number,
    createAt: Date,
    status: String
})

const AdminAttendance = model("AdminAttendance",adminAttendanceSchema)

module.exports = AdminAttendance