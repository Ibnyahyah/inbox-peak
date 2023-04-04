const Campaign = require("../model/campaign");

const per = [0.01, 0.02, 0.05, 0.5, 0.6];
const randomNumber = Math.floor(Math.random() * per.length);

function valueDistributor(value) {
    const calculatedValue = (per[randomNumber] * value / 100);
    return calculatedValue;
}
function percentageCalculator(value) {
    return (per[randomNumber] * value / 100);
}

async function customPercentageAndRateAdder({ campaign, element, calculated_value }) {
    campaign[element].rate = Number(campaign[element].rate) + calculated_value;
    console.log(campaign[element].rate);
    campaign[element].percentage = percentageCalculator(Number(campaign[element].rate));
}

const campaignController = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        let calculated_value = valueDistributor(100);
        campaigns.forEach(campaign => {
            if (!campaign.running) {
                console.log((Number(campaign.total_recipients.rate) - Number(campaign.total_emails_in_csv_file)), calculated_value);
                if ((Number(campaign.total_recipients.rate) - Number(campaign.total_emails_in_csv_file)) < calculated_value) {
                    (async function () {
                        customPercentageAndRateAdder({ campaign, element: 'email_sent', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'click_rate', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'spam_rate', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'recipient_reached', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'recipient_left', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'campaign_score', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'bounce_rate', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'inbox_rate', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'open_rate', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'source_of_traffic_percentage', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'device_type_percentage', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'countries_percentage', calculated_value });
                        customPercentageAndRateAdder({ campaign, element: 'unsubscribe', calculated_value });
                        await campaign.save();
                    })();
                }
                console.log(campaign);
            }

        });


    } catch (error) {
        console.log(error);
        // res.send({ message: "Something went wrong", error: error.message });
    }
    setTimeout(campaignController, 1000);
}

module.exports = campaignController;

