import express from 'express';
const router = express.Router();
import HelpChat from '../models/helpChat.js';
import PersonWhoWrites from '../models/personWhoWrites.js';

router.post('/:_id', async (req, res) => {
    try {
        const { question } = req.body;

        const { _id } = req.params;

        const searchedHelpChat = await HelpChat.findOne({
            user_who_needs_help: _id
        });

        if (!searchedHelpChat) {
            const newHelpChat = new HelpChat({
                user_who_needs_help: _id
            });
            const savedHelpChat = await newHelpChat.save();
        }

        const newPersonWhoWrites = new PersonWhoWrites({
            person_who_writes: _id,
            message: question
        });

        const savedPersonWhoWrites = await newPersonWhoWrites.save();

        const updatedHelpChat = await HelpChat.updateOne(
            { user_who_needs_help: _id },
            { $push: { chat: newPersonWhoWrites } }
        );

        res.json({ message: 'Got your help request!' });
        return;

    } catch (err) {
        console.log('Error on POST /help-chat/:id', err);
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const helpChat = await HelpChat.findOne({ user_who_needs_help: _id })
            .populate('chat');
    
        if (!helpChat) {
            res.json({ message: 'HelpChat not found! Something went wrong!' });
            return;
        };

        res.json({ message: 'Here is your help chat!', helpChat });
        return;

    } catch (err) {
        console.log('Error on GET /help-chat/:_id', err);
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;