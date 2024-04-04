const express= require('express');
const router = express.Router();
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const {test,registerUser,loginUser,getProfile,logoutUser,homepagedata,teamData,weather1,eventdata} = require('../controllers/authController')
// middleware
router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({extended: false}))
const corsOptions = {
    origin: 'https://genuine-crostata-3ec8e9.netlify.app', // Update with your Netlify origin
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

module.exports = router