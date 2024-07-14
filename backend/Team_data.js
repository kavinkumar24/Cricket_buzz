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
const cricket_team = new Schema({
    team_name: { type: String, required: true },
})
const team_data = mongoose.model('team_data',cricket_team);
module.exports = team_data