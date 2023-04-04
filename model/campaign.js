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
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    inbox_rate: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    bounce_rate: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    unsubscribe: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    email_sent: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    total_emails_in_csv_file: {
        type: String,
    },
    click_rate: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    spam_rate: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    total_recipients: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
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
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    recipient_left: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    campaign_score: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    source_of_traffic_percentage: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    device_type_percentage: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    },
    countries_percentage: {
        rate: {
            type: String,
            default: "0"
        },
        percentage: {
            type: Number,
        }
    }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;