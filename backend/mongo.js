const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Cricket_scoreboard_users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connected")
    })
    .catch((err) => {
        console.log('failed', err)
    });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        required: true,
        enum: ['user', 'admin']
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
