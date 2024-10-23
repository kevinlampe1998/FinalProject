import express from 'express';
const router = express.Router();
import HelpChat from '../models/helpChat.js';
import PersonWhoWrites from '../models/personWhoWrites.js';

router.post('/:_id', async (req, res) => {
    try {
        const { question } = req.body;
        console.log(question);

        const { _id } = req.params;
        console.log(_id);

        const searchedHelpChat = await HelpChat.find({
            user_who_needs_help: _id
        });

        if (searchedHelpChat) {
            console.log('HelpChat Environment already exists!');
        };

        if (!searchedHelpChat) {
            const newHelpChat = new HelpChat({
                user_who_needs_help: _id
            });
            console.log(newHelpChat);
    
            const savedHelpChat = await newHelpChat.save();
            console.log(savedHelpChat);
        }

        const newPersonWhoWrites = new PersonWhoWrites({
            person_who_writes: _id,
            message: question
        });
        console.log(newPersonWhoWrites);

        const savedPersonWhoWrites = await newPersonWhoWrites.save();
        console.log(savedPersonWhoWrites);

        const updatedHelpChat = await HelpChat.updateOne(
            { user_who_needs_help: _id },
            { $push: { chat: newPersonWhoWrites } }
        );
        console.log(updatedHelpChat);

        res.json({ message: 'Got your help request!' });
        return;

    } catch (err) {
        console.log('Error on POST /help-chat', err);
        res.json({ message: 'Image: Something went wrong!' });
        return;
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const helpChat = await HelpChat({ user_who_needs_help: _id })
            .populate('chat');
    
        if (!helpChat) {
            res.json({ message: 'HelpChat not found! Something went wrong!' });
            return;
        };

        res.json({ message: 'Here is your help chat!', helpChat });
        return;

    } catch (err) {
        console.log('Error on GET /help-chat', err);
        res.json({ message: 'Image: Something went wrong!' });
        return;
    }
});

export default router;