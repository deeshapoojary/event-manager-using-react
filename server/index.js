const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const axios = require('axios');
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON bodies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const session = require('express-session');
const UserModel = require('./modules/Events_Info')

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use body-parser for parsing JSON bodies

const url = 'mongodb+srv://disha:dishadisha@cluster0.0fuuedz.mongodb.net/Event';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

//connecting to Events_Info
app.get('/getEvents', (req, res) => {
  Data.find()
  .then(organizer => res.json(organizer))
  .catch(err => res.json(err))
})

//fetching data from Student_Registartion
app.get('/getRegistration', (req, res) => {
  Regs.find()
  .then(students => res.json(students))
  .catch(err => res.json(err))
})

// Generating tokens and creating sessions
const secretKey = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// app.use((req,res,next)=>{
//   const {organizer}=req.body;
//   req.sessionOptions.secret=crypto.createHash('sha256').update(organizer).digest('hex')

// })

// Register Schema
const regSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  club: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Reg = mongoose.model('users', regSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, club, password, confirm_password } = req.body;
  
  if (!name || !email || !club || !password || !confirm_password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await Reg.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newReg = new Reg({
      name,
      email,
      club,
      password: hashedPassword
    });

    await newReg.save();
    return res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

// Register_student Schema
const regsSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true,unique: false},
  branch: { type: String, required: true,unique: false },
  year: { type: String, required: true, unique: false },
  division: { type: String, required: true,unique: false },
  moodle: { type: String, required: true, unique: true }
});

const Regs = mongoose.model('students', regsSchema);

// Register_students Route
app.post('/register_student', async (req, res) => {
  const { name, email, branch, year, division, moodle } = req.body;
  
  if (!name || !email || !branch || !year || !division|| !moodle) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingStudent = await Regs.findOne({ moodle });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student is already registered' });
    }
    const newStudent= new Regs({name,email,branch,year,division,moodle})
    await newStudent.save();
    return res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

//Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const reg = await Reg.findOne({ email });
    if (!reg) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, reg.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.session.reg = { email: reg.email };
    // Send the club name along with the login success message
    return res.json({ message: 'Login successful', club: reg.club });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Organizer Schema
const dataSchema = new mongoose.Schema({
  organizer:String,
  eventName: String,
  eventDescription: String,
  eventVenue: String,
  eventDate: String,
  eventTime: String,
  seatsAvailable: Number,
  bookingLink: String
});

const Data = mongoose.model('organizer', dataSchema);

// Add Route
app.post('/add', (req, res) => {
  const newData = new Data(req.body);
  newData.save()
    .then(() => res.json('Data added successfully'))
    .catch((err) => res.status(400).json({ message: 'Error adding data', error: err }));
});

const coll = Data
app.get("/club_events", async (req, res) => {
  const { organizer } = req.query;

  try {
    const club_events = await coll.find({ organizer }).toArray();
    res.json(club_events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const collection = Regs;
// API endpoint to get emails
app.get("/email", async (req, res) => {
  try {
    const email = await collection.distinct("email");
    res.json(email);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
