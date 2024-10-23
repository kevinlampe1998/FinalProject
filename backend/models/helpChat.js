import mongoose from "mongoose";

const helpChatSchema = new mongoose.Schema({
    user_who_needs_help: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonWhoWrites'

    }]
});

export default mongoose.model('HelpChat', helpChatSchema);