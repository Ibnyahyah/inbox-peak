const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    campaignID: {
        type: String,
        required: true,
        unique: true,
    },
    uploaded_csv: {
        type: String,
        required: true,
    },
    sender_name: {
        type: String,
        required: true,
    },
    sender_email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    source_of_traffic: {
        type: [String],
        required: true,
    },
    browser_type: {
        type: [String],
        required: true,
    },
    country: {
        type: [String],
        required: true,
    },
    open_rate: {
        type: String,
        required: true,
    },
    inbox_rate: {
        type: String,
        required: true,
    },
    bounce_rate: {
        type: String,
        required: true,
    },
    unsubscribe: {
        type: String,
        required: true,
    },
    email_sent: {
        type: String,
        required: true,
    },
    total_emails_in_csv_file: {
        type: String,
        required: true,
    },
    running: {
        type: Boolean,
        default: true,
    },
    creator: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;