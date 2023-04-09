const Campaign = require("../model/campaign");

const per = [0.01, 0.02, 0.05, 0.5, 0.6];
function randomNumber() {
    return Math.floor(Math.random() * per.length);
}

function valueDistributor(value) {
    const calculatedValue = (per[randomNumber()] * value / 100);
    return calculatedValue;
}
function percentageCalculator({ total_value, value }) {
    let result = ((value / total_value) * 100)
    return result;
}

async function customPercentageAndRateAdder({ campaign, element, calculated_value }) {
    campaign[element].rate += Number(String(calculated_value).split('.')[0]);
    campaign[element].percentage = percentageCalculator({ total_value: Number(campaign.total_emails_in_csv_file), value: campaign[element].rate });
}

function mapper(campaign, arr) {
    let newArr = [];
    campaign[arr].forEach((element, index, array) => {
        let obj = {
            name: '',
            percentage: 0,
        };
        obj.name = element;
        obj.percentage = (per[randomNumber()] + index) / array.length * 100;
        newArr.push(obj);
    });
    return newArr;
}

const campaignController = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        console.log(campaigns.length)
        if (campaigns.length < 0) return;
        campaigns.forEach(campaign => {
            if (campaign.running) {
                let calculated_value = valueDistributor(Number(campaign.total_emails_in_csv_file));
                const email_sent_value = calculated_value;
                const click_rate_value = calculated_value * 0.5;
                const spam_rate_value = calculated_value * 0.002;
                const bounce_rate_value = calculated_value * 0.005;
                const unsubscribe_rate_value = calculated_value * 0.005;
                const inbox_rate_value = calculated_value * 0.2;
                const open_rate_value = email_sent_value - (email_sent_value * 0.5);
                const total_recipients_value = campaign.recipient_reached.rate;
                const recipient_reached_value = email_sent_value / 2;
                const recipient_left_value = Number(campaign.total_emails_in_csv_file) - campaign.recipient_reached.rate;
                const campaign_score_value = calculated_value * 2;

                // console.log({
                //     click_rate_value,
                //     spam_rate_value,
                //     bounce_rate_value,
                //     unsubscribe_rate_value,
                //     inbox_rate_value,
                //     open_rate_value,
                //     recipient_left_value,
                //     recipient_reached_value,
                //     campaign_score_value,
                //     calculated_value,
                //     chek: (Number(campaign.total_emails_in_csv_file) - Number(campaign.email_sent.rate)).toString().startsWith('-')
                // });

                (async function () {
                    if (!(Number(campaign.total_emails_in_csv_file) - Number(campaign.email_sent.rate)).toString().startsWith('-')) {
                        customPercentageAndRateAdder({ campaign, element: 'email_sent', calculated_value: email_sent_value });
                    }
                    campaign.total_recipients.rate = total_recipients_value;
                    campaign.total_recipients.percentage = percentageCalculator({ total_value: campaign.total_emails_in_csv_file, value: campaign.total_recipients.rate });
                    if (!(Number(campaign.total_emails_in_csv_file) - Number(campaign.total_recipients_value)).toString().startsWith('-')) {
                        customPercentageAndRateAdder({ campaign, element: 'click_rate', calculated_value: click_rate_value });
                        customPercentageAndRateAdder({ campaign, element: 'spam_rate', calculated_value: spam_rate_value });
                        customPercentageAndRateAdder({ campaign, element: 'recipient_reached', calculated_value: recipient_reached_value });
                        customPercentageAndRateAdder({ campaign, element: 'campaign_score', calculated_value: campaign_score_value });
                        customPercentageAndRateAdder({ campaign, element: 'bounce_rate', calculated_value: bounce_rate_value });
                        customPercentageAndRateAdder({ campaign, element: 'inbox_rate', calculated_value: inbox_rate_value });
                        customPercentageAndRateAdder({ campaign, element: 'open_rate', calculated_value: open_rate_value });
                        customPercentageAndRateAdder({ campaign, element: 'unsubscribe', calculated_value: unsubscribe_rate_value });
                        campaign.recipient_left.rate = recipient_left_value;
                        campaign.recipient_left.percentage = percentageCalculator({ total_value: campaign.total_emails_in_csv_file, value: campaign.recipient_left.rate });
                        campaign.countries_percentage = mapper(campaign, 'country');
                        campaign.source_of_traffic_percentage = mapper(campaign, 'source_of_traffic');
                        campaign.device_type_percentage = mapper(campaign, 'browser_type');
                        await campaign.save();
                    }
                })();
                console.log(campaign);
            }

        });


    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Something went wrong", error: error.message });
    }
    setTimeout(campaignController, 1000);
}

module.exports = campaignController;

