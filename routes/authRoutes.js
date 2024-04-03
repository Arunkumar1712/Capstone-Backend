const express= require('express');
const router = express.Router();
const cors = require('cors');
const {mongoose} = require('mongoose')
const {test,registerUser,loginUser,getProfile,logoutUser,homepagedata,teamData,weather1,eventdata} = require('../controllers/authController')
// middleware
router.use(
    cors({
        credentials: true,
         origin: '*'
    })
)
router.get('/',test)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser);

router.get('/homepagedata', homepagedata);
router.get('/teamData',teamData)
router.get('/weather', weather1);
router.get('/eventsdata',eventdata)

module.exports = router