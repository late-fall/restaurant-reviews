//entry point to backend application
//create and initializing express

require("dotenv").config(); //as per documentation for dotenv
const express = require("express")
const cors = require("cors")
const db = require("./db"); // now we have access to db object

const app = express()

app.use(cors());
app.use(express.json()) //built in middleware from express

// GET ALL restaurants
app.get("/api/v1/restaurants", async (req, res) =>{
    try {
        // const results = await db.query("SELECT * FROM rst") //this will take time, so need to make it as a promise
        const restaurantRatingsData = await db.query("select * from rst left join (select rst_id, COUNT(*), TRUNC(AVG(rating), 1) as avg_rating from reviews group by rst_id) reviews on rst.id = reviews.rst_id;")

        res.status(200).json({// can change status code using .status()
        status: "success",
        results: restaurantRatingsData.rows.length, //return length of all data, good practice to do. 
        data: {
            restaurants: restaurantRatingsData.rows //this is where the data is all stored
        }
    })
    } 
    catch (err) {
        console.log(err)
    }
}) //set url. server is running on local host. http://localhost:3001/getRestaurants

//Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    //req.params is id. 
    try {
        // const results = await db.query(`SELECT * FROM rst where id = ${req.params.id}`)//never recommended to use text here, due to SQL injection attacks, use parameterized query.
        const restaurant = await db.query("select * from rst left join (select rst_id, COUNT(*), TRUNC(AVG(rating), 1) as avg_rating from reviews group by rst_id) reviews on rst.id = reviews.rst_id where id = $1;", [req.params.id]) //-> select * from restuarants where id = req.params.id

        const reviews = await db.query("SELECT * FROM reviews where rst_id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        })
    } 
    catch (err) {
        console.log(err)    
    }
    
})

//create a restaurant, POST route
app.post("/api/v1/restaurants", async (req, res)=>{
    try {
        const results = await db.query("INSERT INTO rst (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (err) {
        console.log(err)
    }
    
})

//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const results = await db.query("UPDATE rst SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const results = await db.query("DELETE FROM rst where id = $1", [req.params.id])
        res.status(204).json({
            status: "deletion successful"
        })
    } catch (err) {
        console.log(err)
    }
})

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (rst_id, name, review, rating) values ($1, $2, $3, $4) returning *", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT || 3001 //port number doesn't matter, pick one. environmental variable used, if not defined, use 3001.
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})
