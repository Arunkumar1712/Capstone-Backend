const express= require('express');
const router = express.Router();
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const {test,registerUser,loginUser,getProfile,logoutUser,homepagedata,teamData,weather1,eventdata,
  businessmeeting,summarparty,wedding} = require('../controllers/authController')
// middleware
router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({extended: false}))
const corsOptions = {
    origin: ['https://660ecc4e96df2719848f6a79--genuine-crostata-3ec8e9.netlify.app', 'http://localhost:3000'], // Update with your Netlify origin
    credentials: true,
  };
  
  // Enable CORS with the specified options
  router.use(cors(corsOptions));
// router.use(
//     cors({
//         origin: 'https://660d7f138d457f082aba3792--genuine-crostata-3ec8e9.netlify.app/',
//         credentials: true, 
//     })
// )
router.get('/',test)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser);

router.get('/homepagedata', homepagedata);
router.get('/teamData',teamData)
router.get('/weather', weather1);
router.get('/eventsdata',eventdata)
router.get('/recomendations/:Business-Meeting',businessmeeting)
router.get('/recomendations/:Summer-Party',summarparty)
router.get('/recomendations/:Wedding',wedding)
module.exports = router