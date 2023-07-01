import { db } from "../Database/Database.js";
import { 
    allBoats,
    boat,
    typeBoats,
    boatSearch,
    likeBoatVer,
    addLikeBoat,
    removeLikeBoat,
 } from "./queries.js";


const formatDates = (rows) => {
    return rows.map((row) => {
      const dateString = row.date; // Replace 'date' with the actual date field name
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  
      return {
        ...row,
        date: formattedDate, // Replace 'date' with the actual date field name
      };
    });
  }


 // Get all boats
export const getAllBoats =  async (req, res) => {
    try {
        const data = await db.query(allBoats);
      
        // Iterate over the rows and format the date field
        const formattedDate = formatDates(data.rows)
        res.json(formattedDate);

      } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "Internal Server Error" });
      };
  };

// Get any Boat by id
export const getBoat = async (req, res) => {
    try {
        const rentalId = Number(req.params.id);

        const data = await db.query(boat, [rentalId]);
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    };
};

    // Get boats by their types
export const getTypeBoats = async (req, res) => {
    try {
        const rentalType = req.params.type;
        // console.log(rentalType)
        const data = await db.query(typeBoats, [rentalType]);
       
        const formattedDate = formatDates(data.rows);
        res.json(formattedDate);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"})
    }
}

    // Get boats by search
  export const searchBoats = async (req, res) => {
    try {
        let { location, date, group_size } = req.body;

        location = location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

        const values = [`%${location}%`, date, group_size];
        const data = await db.query(boatSearch, values);
        const formattedDate = formatDates(data.rows);
        res.json(formattedDate)

    } catch (error){
        res.status(500).json({ error: "Internal Server Error"});
    };
};
    
// Liked boats
export const likedBoats = async (req, res) => {
     try {
    const { id, location, price, date, group_size, image1 } = req.body;
    const checkResult = await db.query(likeBoatVer, [id]);
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: "Boat already exists" });
        }
  
      const insertResult = await db.query(addLikeBoat, [
        id,
        location, 
        price, 
        date, 
        group_size, 
        image1
    ]);
      res.json(insertResult.rows[0])

    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "An error occurred" });
    } 
  };
  
  
export const delLikedBoat = async (req, res) => {
  try {
    const rentalId  = Number(req.params.id);
    
    const data = await db.query(removeLikeBoat, [rentalId]);
    res.send(200).json(data.rows[0]);

  } catch (error) {
    res.send(500).json({error: "Invalid"});

  };
};