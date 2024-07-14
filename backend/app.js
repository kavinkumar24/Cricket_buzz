const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
const WebSocket = require('ws');
const User = require("./mongo");
const Match = require('./cricket_score');
const team_data = require('./Team_data');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
});

const broadcastUpdates = async () => {
    try {
        const match = await Match.findOne({});
        const teams = await team_data.find({});
        const updatedData = { teams: teams, matches: match ? match.teams : [] };
        const message = JSON.stringify(updatedData);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    } catch (error) {
        console.error('Error broadcasting updates:', error);
    }
};

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };
  
      res.status(200).json({
        message: "Login successful",
        userData: userData
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
});

app.post('/insert_team', async (req, res) => {
  const { team_name } = req.body;
  try {
      const newTeam = new team_data({ team_name }); 
      await newTeam.save(); 
      res.status(201).json({ success: true, message: 'Team added successfully' });
      await broadcastUpdates();
  } catch (error) {
      console.error('Error adding team:', error);
      res.status(500).json({ success: false, message: 'Failed to add team' });
  }
});

app.get('/teams', async (req, res) => {
  try {
    const teams = await team_data.find();
    res.status(200).json({ success: true, teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch teams' });
  }
});

app.put('/match', async (req, res) => {
  const { teamIndex, playerIndex, player } = req.body;

  try {
      const match = await Match.findOne({});
      if (!match) {
          return res.status(404).json({ message: 'Match data not found' });
      }

      match.teams[teamIndex].players[playerIndex] = player;
      await match.save();

      await broadcastUpdates();

      res.status(200).json({ message: 'Player data updated successfully' });
  } catch (error) {
      console.error('Error updating player data:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


app.get("/match", async (req, res) => {
  try {
    const match = await Match.findOne({});
    if (!match) {
      return res.status(404).json({ message: "Match data not found" });
    }
    res.status(200).json({ teams: match.teams });
  } catch (error) {
    console.error("Error fetching match data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

server.listen(8001, () => {
  console.log("Server is running on port 8001");
});
