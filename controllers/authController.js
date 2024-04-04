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
        res.cookie('token',token).json(user)
       } )
        }
        if(!match){
            res.json({error:'password not match'})
           }
    } catch (error) {
        console.log(error)
    }

}
//end point for profile
const getProfile = async (req, res) => {
  try {
      const { token } = req.cookies;
      if (token) {
          jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
              if (err) {
                  // Token verification failed
                  console.error('Error verifying token:', err);
                  res.status(401).json({ error: 'Unauthorized' });
              } else {
                  // Token verification successful, send user data
                  res.json(user);
              }
          });
      } else {
          // No token found in cookies
          res.status(401).json({ error: 'Unauthorized' });
      }
  } catch (error) {
      // Internal server error
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
  
module.exports={
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    homepagedata,
    teamData,
    weather1,
    eventdata
}