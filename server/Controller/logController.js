import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { 
    allUsers,
    userVer,
    newUser,
    emailVer
 } from "./queries.js";

 export const getUser = async (req, res) => {
    try {
      const users = await db.query(allUsers);
      res.json(users.rows);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    };
  };
  
  export const signUp = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, password, and email required" });
      };
  
      if (password.length < 7) {
        return res.status(400).json({ error: "Password must be minimum of 8 characters" });
      };
  
      if (username.length < 6) {
        return res.status(400).json({ error: "Username must be minimum of 6 characters" });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format" });
      }; 
  
      const isValid = await db.query(userVer, [username]);
  
      if (isValid.rows[0]) {
        throw new Error("User already exists");
      };
  
     
      const userData = await db.query(newUser, [username, email, password]);
  
      const token = jwt.sign(userData.rows[0].id, process.env.JWT_TOKEN);
  
      res.json({
        status: "success",
        token,
        username: userData.rows[0].username
      });

    } catch (error) {
      // console.error(error.message);
      res.status(500).json({ error: error.message});
    };
  };

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await db.query(emailVer, [email]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({ err: 'Invalid username' });
      }
  
      const isValid = await bcrypt.compare(password, user.rows[0].password);
      console.log(isValid)
      if(!isValid) {
        return res.status(400).json({err: 'Invalid password'});
      }
      const token = jwt.sign(user.rows[0].id, process.env.JWT_TOKEN);
      
      res.json({
        status: "success",
        token,
        user: user.rows[0],
      });

    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    };
  };