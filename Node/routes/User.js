const express = require('express')
const router = express.Router()
const UserMiddleware = require('../middleware/authentication_user')
const {
  registerUser,
  loginUser,
  updateUser,
  okButton,
  productStatus,
  setMappingTo0,
  getOutput,
  getUserData
} = require('../controllers/User')

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/update').post(UserMiddleware,updateUser)
router.route('/okbutton').get(UserMiddleware,okButton)
router.route('/productstatus/:productId').get(productStatus)
router.route('/setmappingto0/:productId').get(setMappingTo0)
router.route('/getoutput').get(UserMiddleware,getOutput)
router.route('/getuserdata').get(UserMiddleware,getUserData)

module.exports = router