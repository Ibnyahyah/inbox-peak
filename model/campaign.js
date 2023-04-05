const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    campaignID: {
        type: String,
        unique: true,
    },
    uploaded_csv: {
        type: String,
    },
    sender_name: {
        type: String,
    },
    sender_email: {
        type: String,
    },
    subject: {
        type: String,
    },
    source_of_traffic: {
        type: [String],

    },
    browser_type: {
        type: [String],
    },
    country: {
        type: [String],
    },
    open_rate: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    inbox_rate: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    bounce_rate: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    unsubscribe: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    email_sent: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    total_emails_in_csv_file: {
        type: String,
    },
    click_rate: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    spam_rate: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    total_recipients: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    sent: {
        type: String,
    },
    running: {
        type: Boolean,
        default: true,
    },
    creator: {
        type: String,

    },
    recipient_reached: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    recipient_left: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    campaign_score: {
        rate: {
            type: Number,
            default: 0
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    source_of_traffic_percentage: {
        type: Array,
        default: []
    },
    device_type_percentage: {
        type: Array,
        default: []
    },
    countries_percentage: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;