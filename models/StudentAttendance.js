const {model,Schema} = require("mongoose")

const studentAttendanceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    createAt: {
        type: Date,
        require: [true,"Date must be require"]
    },
    AdminAttendanceId: {
        type: Schema.Types.ObjectId,
        ref: "AdminAttendance"
    }
})

const StudentAttendance = model("StudentAttendance",studentAttendanceSchema)

module.exports = StudentAttendance