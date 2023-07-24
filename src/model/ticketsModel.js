import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        min: 10,
        max: 80
    },
    creationTime: {
        type: Number,
        required: true,
    },
    labels: {
        type: [String],
        required: true,
        validate: (v) => Array.isArray(v) && v.length > 0
    }

})

const Ticket = mongoose.model('tickets', ticketSchema);

export default Ticket;