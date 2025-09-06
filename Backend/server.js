const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

mongoose.connect('mongodb+srv://acebot_user:Tanya3690@mycluster.nl3d2o3.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected!')).catch(err => console.error(err));

const SelectionSchema = new mongoose.Schema({
  email: String,
  interviewType: String,
  timestamp: { type: Date, default: Date.now }
});
const Selection = mongoose.model('Selection', SelectionSchema);
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});
app.post('/save-interview-selection', async (req, res) => {
  const { email, interviewType } = req.body;

  if (!email || !interviewType) {
    return res.status(400).json({ error: 'Email and interviewType are required' });
  }

  try {
    const newSelection = new Selection({ email, interviewType });
    await newSelection.save();
    res.json({ success: true, message: 'Selection saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/get-history/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const selections = await Selection.find({ email }).sort({ timestamp: -1 });
    res.json(selections);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});



app.listen(5000, () => console.log('Server running on port 5000'));
