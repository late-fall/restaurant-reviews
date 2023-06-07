import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
        e.preventDefault() //prevent from reloading the page. As this is not desirable in React App.
        try {
            const response = await RestaurantFinder.post("/", {
                name: name, // can shorten to just name,
                location: location, //can shorten to just location,
                price_range: priceRange
            })
            addRestaurants(response.data.data.restaurant)
        } catch (error) {
            
        }
    }
  return (
    <div className='mb-4'>
        <form action="">
            <div className="row justify-content-center">
                <div className="col-3">
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className='form-control' placeholder='name'/>
                </div>
                <div className="col-2">
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className='form-control' placeholder='location'/>
                </div>
                <div className="col-2 me-2">
                    <select className='form-control rounded' value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type="submit" className='btn btn-dark col-1'>Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant