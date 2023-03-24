const Campaign = require("../model/campaign");
const jwt = require('jsonwebtoken');
require('dotenv').config();


// create a campaign
const createCampaign = async (req, res) => {
    try {
        const { campaignID, uploaded_csv, sender_name, sender_email, subject, source_of_traffic, browser_type, country, open_rate, inbox_rate, bounce_rate, unsubscribe, email_sent, total_emails_in_csv_file } = req.body;

        const token = req.headers?.authorization.split(' ')[1];
        if (token?.trim() == '') return res.status(403).send({ message: "Token is undefined." });
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role?.trim().toLowerCase() !== 'admin') return res.status(403).send({ message: "Unauthorized user." });
        await Campaign.create({ campaignID, uploaded_csv, sender_name, sender_email, subject, source_of_traffic, browser_type, country, open_rate, inbox_rate, bounce_rate, unsubscribe, email_sent, creator: decodedData.username, total_emails_in_csv_file });
        res.status(200).send({ message: "Campaign created" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}


// update a campaign
const updateCampaign = async (req, res) => {
    try {
        const id = req.params.id;
        const token = req.headers.authorization.split(' ')[1];
        if (token.trim() == '') return res.status(403).send({ message: "Token is undefined." });
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role.trim().toLowerCase() !== 'admin') return res.status(403).send({ message: "Unauthorized user." });
        const campaign = await Campaign.findByIdAndUpdate(id);
        if (!campaign) return res.status(404).send({ message: "Campaign not found." });
        const { uploaded_csv, sender_name, sender_email, subject, source_of_traffic, browser_type, country, open_rate, inbox_rate, bounce_rate, unsubscribe, email_sent, total_emails_in_csv_file } = req.body;

        if (uploaded_csv) campaign.uploaded_csv = uploaded_csv;
        if (sender_name) campaign.sender_name = sender_name;
        if (sender_email) campaign.sender_email = sender_email;
        if (subject) campaign.subject = subject;
        if (source_of_traffic) campaign.source_of_traffic = source_of_traffic;
        if (browser_type) campaign.browser_type = browser_type;
        if (country) campaign.country = country;
        if (open_rate) campaign.open_rate = open_rate;
        if (inbox_rate) campaign.inbox_rate = inbox_rate;
        if (bounce_rate) campaign.bounce_rate = bounce_rate;
        if (unsubscribe) campaign.unsubscribe = unsubscribe;
        if (email_sent) campaign.email_sent = email_sent;
        if (total_emails_in_csv_file) campaign.total_emails_in_csv_file = total_emails_in_csv_file;
        await campaign.save();
        res.status(200).send({ message: "Campaign updated successfully." });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}


// get a campaign
const getACampaign = async (req, res) => {
    try {
        const campaignID = req.params.campaignID;
        const campaign = await Campaign.findOne({ campaignID });
        if (!campaign) return res.status(404).send({ message: "Campaign not found." });
        res.status(200).send(campaign);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}


// get all campaign
const getAllCampaign = async (req, res) => {
    try {
        const token = req.headers?.authorization.split(' ')[1];
        if (token?.trim() == '') return res.status(403).send({ message: "Token is undefined." });
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData?.role?.trim()?.toLowerCase() !== 'admin') return res.status(403).send({ message: "Unauthorized user." });
        const campaigns = await Campaign.find();
        res.status(200).send(campaigns);

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
        console.log(error);
    }
}


// delete a campaign
const deleteACampaign = async (req, res) => {
    try {
        const campaignID = req.params.campaignID;
        const token = req.headers.authorization.split(' ')[1];
        if (token.trim() == '') return res.status(403).send({ message: "Token is undefined." });
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData.role.trim().toLowerCase() !== 'admin') return res.status(403).send({ message: "Unauthorized user." });
        const campaign = await Campaign.findOneAndDelete({ campaignID });
        if (!campaign) return res.status(404).send({ message: "Campaign not found." });
        res.status(200).send({ message: "Campaign successfully deleted." });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}


// export a campaign
const exportACampaign = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error: error.message });
    }
}

module.exports = { createCampaign, updateCampaign, deleteACampaign, getACampaign, getAllCampaign };
