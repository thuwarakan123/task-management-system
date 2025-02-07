const mongoose = require("mongoose");
const { isValidDate } = require("../utils/commonMethods")

const TaskSchema = new mongoose.Schema(
  {
    taskName: { 
        type: String, 
        required: [true, "Task name is required"], 
        trim: true
    },
    description: { 
        type: String, 
        maxlength: [1250, "Description cannot exceed 1250 characters"]
    },
    startDate: { 
        type: Date, 
        required: [true, "Start date is required"],
    },
    endDate: { 
        type: Date, 
        required: [true, "End date is required"],
        validate: {
          validator: function (value) {
            return value >= this.startDate;  
          },
          message: "End date cannot be earlier than the start date"
        }
    },
    assignedUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: [true, "Assigned user is required"]
    },
    status: { 
        type: String, 
        enum: {
            values: ["pending", "completed"],
            message: "Status must be either 'pending' or 'completed'"
        }, 
        default: "pending" 
    },
    completionDate: { 
        type: Date,
        validate: {
          validator: function (value) {
            return this.status === "completed" ? value !== null : true;
          },
          message: "Completion date is required when the status is 'completed'"
        }
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;


