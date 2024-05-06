const { sendMail } = require('../../controllers/SupplyManagement/sendMailController')


const express = require('express')

router = express.Router()

router.route('/').post(sendMail);

module.exports = router