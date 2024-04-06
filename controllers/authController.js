const User = require('../models/user')
const {hashPassword, comparePassword} = require("../helpers/auth")
const jwt = require('jsonwebtoken');
const {mongoose} = require('mongoose')

const axios = require('axios');

const test =(req,res)=>{
    res.json('test is working')
}
// for usersignup
const registerUser= async (req,res)=>{
    try{
       const {name,email,password}=req.body;
       // check if name was entered
       if(!name){
        return res.json({
            error:"name is required"
        })
       }
       // check password
       if (!password || password.length < 6) {
        return res.json({
          error: "Password is required and must be at least 6 characters long"
        });
      }
       //check email
       const exist = await User.findOne({email});
       if(exist){
        return res.json({
            error: "email is already registered"
        })
       }
       const hashedPassword = await hashPassword(password)
// create user in database
       const user = await User.create({
        name,
        email,
        password:hashedPassword,
       })
       return res.json(user)
    }catch(error){
     console.log(error)
    }
}
// login end point
const loginUser =async (req,res)=>{
    try {
        const{email,password}=req.body;
        // checks if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: "No user found"
            })
        }
        //check password match
        const match = await comparePassword(password,user.password)
        if(match){
       jwt.sign({email: user.email, id: user._id,name:user.name},process.env.JWT_SECRET,{},(err,token)=>{
        if(err) throw err;
        res.cookie('token', token);
        // Send the user data along with the token
        res.json({ user, token });
    });
} else {
    res.json({ error: 'Password does not match' });
}
    } catch (error) {
        console.log(error)
    }

}
//end point for profile
const getProfile = async(req,res) =>{
 const  {token} = req.cookies
 console.log('Token:', token);
 if (token) {
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
          console.error('Error verifying JWT token:', err);
          return res.json(null);
      }
      console.log('Decoded User:', user); // Log the decoded user information
      res.json(user);
  });
} else {
  res.json(null);
}
}
// logout end point
const logoutUser = async (req, res) => {
    try {
      // Perform logout logic here, such as clearing tokens or destroying the session
      // For example, in a token-based authentication system, you might clear the token from cookies
      res.clearCookie('token');
      res.json({ success: true, message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'An error occurred during logout. Please try again.' });
    }
  };
// const logoutUser = async (req, res) => {
//     try {
//       // Perform logout logic here, such as clearing the session or token
//       // For example, in a session-based authentication system, you might destroy the session
//       req.session.destroy((err) => {
//         if (err) {
//           console.error('Failed to destroy session:', err);
//           res.status(500).json({ error: 'Failed to logout. Please try again.' });
//         } else {
//           // Respond with a success message indicating successful logout
//           res.json({ success: true, message: 'Logout successful' });
//         }
//       });
//     } catch (error) {
//       console.error('Error during logout:', error);
//       res.status(500).json({ error: 'An error occurred during logout. Please try again.' });
//     }
//   };
  // end point to get home page card data
const homepagedata = async(req,res)=>{
    try {
        // Fetch data from the 'homepageproducts' collection
        const homepageProductsCollection = mongoose.connection.collection('homepageproducts');

        // Fetch data from the 'homepageproducts' collection
        const homepageProducts = await homepageProductsCollection.find({}).toArray();
        res.json(homepageProducts);
    } catch (error) {
        // Handle errors
        console.error('Error fetching homepage products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const teamData = async(req,res)=>{
    try {
        // Fetch data from the 'homepageproducts' collection
        const teamDataCollection = mongoose.connection.collection('teamData');

        // Fetch data from the 'homepageproducts' collection
        const teamDataperson = await teamDataCollection.find({}).toArray();
        res.json(teamDataperson);
    } catch (error) {
        // Handle errors
        console.error('Error fetching teamData', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// const weather = async (req, res) => {
//     try {
//         const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=9c01501b2d332f58638684fa75f21383 ',);
//         res.json(response.data);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
//   }

  const weather1 = async (req, res) => {
    try {
      // Extract the city from the query parameters
      const { city, lat, lon } = req.query;
  
      let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
      let params = {};
  
      // If city is provided, use it to fetch weather data
      if (city) {
        params = {
          q: city,
          units: 'metric',
          appid: '9c01501b2d332f58638684fa75f21383', // Replace 'YOUR_API_KEY' with your actual API key
        };
      } 
      // If latitude and longitude are provided, use them to fetch weather data
      else if (lat && lon) {
        params = {
          lat,
          lon,
          units: 'metric',
          appid: '9c01501b2d332f58638684fa75f21383', // Replace 'YOUR_API_KEY' with your actual API key
        };
      }
  
      const response = await axios.get(apiUrl, { params });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
const eventdata = async(req,res)=>{
  try {
    // Fetch data from the 'homepageproducts' collection
    const eventsDataCollection = mongoose.connection.collection('eventsdata');

    // Fetch data from the 'homepageproducts' collection
    const eventDataperson = await eventsDataCollection.find({}).toArray();
    res.json(eventDataperson);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const businessmeeting= async(req,res)=>{
  try {
    
    const buisnessrecom = mongoose.connection.collection('businessmeeting');
    const buisnessrecomendation = await buisnessrecom.find({}).toArray();
    res.json(buisnessrecomendation);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const summarparty=async(req,res)=>{
  try {
    const summardata = mongoose.connection.collection('summarparty');
    const datasummer = await summardata.find({}).toArray();
    res.json(datasummer);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const wedding= async (req,res)=>{
  try {
    const weddingdata = mongoose.connection.collection('weddingdata');
    const datawedding = await weddingdata.find({}).toArray();
    res.json(datawedding);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}  

const cocktail = async (req, res) => {
  try {
    const mongoURI = process.env.MONGO_URL; // Assuming you have the MongoDB connection URL stored in an environment variable

    // Connect to MongoDB using the connection URL
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(); // Get the database instance

    // Access the 'cocktail' collection and retrieve data
    const cocktaildata = db.collection('cocktail');
    const datacocktail = await cocktaildata.find({}).toArray();
    
    // Close the MongoDB connection
    await client.close();

    res.json(datacocktail);
  } catch (error) {
    console.error('Error fetching cocktail data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const office=async(req,res)=>{
  try {
    
    const buisnessrecom = mongoose.connection.collection('officeattire');
    const buisnessrecomendation = await buisnessrecom.find({}).toArray();
    res.json(buisnessrecomendation);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const airport= async(req,res)=>{
  try {
    const airportdata = mongoose.connection.collection('airportoutfit');
    const dataairport = await airportdata.find({}).toArray();
    res.json(dataairport);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const yoga = async (req, res) => {
  try {
    const yogadata = mongoose.connection.collection('YogaPilates');
    const datayoga = await yogadata.find({}).toArray();
    res.json(datayoga);
  } catch (error) {
    console.error('Error fetching YogaPilates data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const music= async(req,res)=>{
  try {
    const musicdata = mongoose.connection.collection('MusicConcert');
    const datamusic= await musicdata.find({}).toArray();
    res.json(datamusic);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const fall= async(req,res)=>{
  try {
    const falldata = mongoose.connection.collection('FallFestival');
    const datafall= await falldata.find({}).toArray();
    res.json(datafall);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const summer=async(req,res)=>{
  try {
    const summerdata = mongoose.connection.collection('summer');
    const datasummer = await summerdata.find({}).toArray();
    res.json(datasummer);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}

}
const winter= async(req,res)=>{
  try {
    const winterdata = mongoose.connection.collection('winter');
    const datawinter = await winterdata.find({}).toArray();
    res.json(datawinter);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const spring= async(req,res)=>{
  try {
    const springdata = mongoose.connection.collection('spring');
    const dataspring = await springdata.find({}).toArray();
    res.json(dataspring);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
const autumn= async(req,res)=>{
  try {
    const autumndata = mongoose.connection.collection('autumn');
    const dataautumn = await autumndata.find({}).toArray();
    res.json(dataautumn);
} catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

const brunch= async(req,res)=>{
 
  try {
    const summardata = mongoose.connection.collection('autumn');
    const datasummer = await summardata.find({}).toArray();
    res.json(datasummer);
  } catch (error) {
    // Handle errors
    console.error('Error fetching teamData', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  }
module.exports={
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    homepagedata,
    teamData,
    weather1,
    eventdata,
    businessmeeting,
    summarparty,
    wedding,
    summer,
    brunch,
    cocktail,
    office,
    airport,
    yoga,
    music,
    fall,
    winter,
    spring,
    autumn
}