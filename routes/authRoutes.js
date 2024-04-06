const express= require('express');
const router = express.Router();
const cors = require('cors');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const {test,registerUser,loginUser,getProfile,logoutUser,homepagedata,teamData,weather1,eventdata,
  businessmeeting,summarparty,wedding,summer,brunch,cocktail,office,airport,yoga,music,
  fall,winter,spring,autumn} = require('../controllers/authController')
// middleware
router.use(express.json())
router.use(cookieParser())
router.use(express.urlencoded({extended: false}))
const corsOptions = {
    origin: ['https://outfit-oracle.netlify.app', 'http://localhost:3000'], // Update with your Netlify origin
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
router.get('/recomendations/Brunch_with_Friends',brunch)
router.get('/recomendations/:Cocktail-Party',cocktail)
router.get('/recomendations/:Office-Attire',office)
router.get('/recomendations/:Airport-Outfits',airport)
router.get('/recomendations/:Yoga_and_Pilates',yoga)
router.get('/recomendations/:Music-Concert',music)
router.get('/recomendations/:Fall-Festival',fall)
router.get('/summer',summer)
router.get('/winter',winter)
router.get('/spring',spring)
router.get('/autumn',autumn)
module.exports = router