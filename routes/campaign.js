const router = require('express').Router();
const { createCampaign, updateCampaign, deleteACampaign, getACampaign, getAllCampaign, pauseOrPlayACampaign } = require('../controller/campaign');

router.post('/create-campaign', createCampaign);
router.patch('/update-campaign/:id', updateCampaign);
router.delete('/delete-campaign/:campaignID', deleteACampaign);
router.get('/:campaignID', getACampaign);
router.get('/', getAllCampaign);
router.patch('/pause-or-play/:id', pauseOrPlayACampaign);

module.exports = router;