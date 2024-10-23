import mongoose from "mongoose";

const personWhoWritesSchema = new mongoose.Schema({
    person_who_writes: String,
    message: String
}, { collection: 'personWhoWrites' });

export default mongoose.model('PersonWhoWrites', personWhoWritesSchema);