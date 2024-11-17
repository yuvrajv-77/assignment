const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    task: { 
        type: String, 
        required: true 
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    },
    timestamp: { type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
