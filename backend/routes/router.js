const express = require("express");
const router = express.Router();
const questionDB = require("../models/Question");
const answerDB = require("../models/Answer");
const verifyToken = require("../auth/authMiddleware"); // Import the verifyToken middleware
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const key = 'srushtisrushtisrushtisrushtisrus'


// Protected route - Add a new question
router.post("/addquestions", async (req, res) => {
    console.log("hi");
    try {
    const { questionName, questionUrl ,username , section} = req.body;
    const question = new questionDB({
        questionName,
        questionUrl,
        username,
        section,
    });
    await question.save();
    res.status(201).send({ message: 'question added succsessfully' });
    } catch (error) {
    console.error('Error while adding question:', error);
    res.status(500).send({ message: 'Error while adding question' });
    }
});
  
// Protected route - Get all questions
router.get("/getquestions", async (req, res) => {
    try {
    await questionDB
        .aggregate([
        {
            $lookup: {
            from: "answers", // collection to join
            localField: "_id", // field from input document
            foreignField: "questionId",
            as: "allAnswers", // output array field
            },
        },
        
        ])
        .exec()
        .then((doc) => {
        res.status(200).send(doc);
        })
        .catch((error) => {
        res.status(500).send({
            status: false,
            message: "Unable to get the question details",
        });
        });
    } catch (e) {
    res.status(500).send({
        status: false,
        message: "Unexpected error",
    });
    }
});

// Protected route - Add a new answer
router.post("/addanswers", async (req, res) => {

try {
    const { answer, questionId , username} = req.body;
    const ans = new answerDB({
        answer,
        questionId,
        username,
    });
    await ans.save();
    res.status(201).send({ message: 'answer added succsessfully'  });
    } catch (error) {
    console.error('Error while adding :', error);
    res.status(500).send({ message: 'Error while adding question' });
    }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error while registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, key ); // Replace with your secret key
    res.status(200).json({ token, user }); // Move this line here
  } catch (error) {
    res.status(500).send({ message: 'Error while logging in'  });
  }
});


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "golsrushti1@gmail.com", // Your Gmail email address
    pass: "bhabytwxnleqzcbe", // Your Gmail password or app password
  },
});

router.post('/sendmail', async (req, res) => {
    const { email } = req.body;
    const sendRegistrationEmail = (userEmail) => {
      const mailOptions = {
        from: "golsrushti1@gmail.com",
        to: userEmail,
        subject: "Welcome to Our App!",
        text: "Thank you for registering on our app. We're excited to have you!",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    };

    await sendRegistrationEmail(email);
});


router.post('/sendmailforgetanswer', async (req, res) => {
  const { username,text } = req.body;
  const user = await User.findOne({ username });

  const sendRegistrationEmail = () => {
    const mailOptions = {
      from: "golsrushti1@gmail.com",
      to: user.email,
      subject: "You got the Answer of your Question",
      html: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };

  await sendRegistrationEmail();
  
});



module.exports = router;

