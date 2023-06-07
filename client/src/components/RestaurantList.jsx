import React, {useContext, useEffect} from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from "react-router-dom"
import StarRating from "./StarRating"

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    const navigate = useNavigate()
    useEffect(() => { //use it to call API
        const fetchData = async () => { //wrap the trycatch block with a function so that it actually doesn't return anything to prevent useEffect error
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
            } catch (error) {}
        }

        fetchData()
    },[]) //empty dependency array. run the hook only when mounting components

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id
            }))
        } catch (error) {
        }
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        if (!restaurant.count){
            return <span className="text-warning">0 Reviews</span>
        }
        return (
            <>
            <StarRating rating={restaurant.avg_rating} />
            <span className="text-warning ms-1">({restaurant.count})</span>
            </>
        )
    }
  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="table-secondary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(rest => { //make sure restaurants exist, if undefined, don't run the code
                    return (
                        <tr onClick={() => handleRestaurantSelect(rest.id)} key = {rest.id}>
                            <td>{rest.name}</td>
                            <td>{rest.location}</td>
                            <td>{"$".repeat(rest.price_range)}</td>
                            <td>{renderRating(rest)}</td>
                            <td><button onClick={(e) => handleUpdate(e, rest.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, rest.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList