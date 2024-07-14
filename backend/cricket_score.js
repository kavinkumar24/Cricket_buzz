const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/Cricket_scoreboard_users",{
    useNewUrlParser: true,
})
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log('failed')
})
const playerSchema = new Schema({
  name: { type: String, required: true },
  runs: { type: Number, required: true },
  balls: { type: Number, required: true }
});

const teamSchema = new Schema({
  teamName: { type: String, required: true },
  teamLogo: { type: String, required: true },
  players: [playerSchema]
});

const matchSchema = new Schema({
  teams: [teamSchema],
  matchDate: { type: Date, default: Date.now }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
