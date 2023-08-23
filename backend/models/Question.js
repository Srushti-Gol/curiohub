const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  }],
});

module.exports = mongoose.model("Questions", QuestionSchema);
