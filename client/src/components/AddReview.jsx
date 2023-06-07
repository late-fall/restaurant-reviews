import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useParams } from 'react-router-dom'

const AddReview = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")

    const handleSubmitReview = async (e) => {
        e.preventDefault() // prevent reloading
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, { //don't have to store it to review.
                name,
                review: reviewText,
                rating,
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }        
    }

    return (
        <div className='mb-2'>
        <form action="">
            <div className="row justify-content-center">
                <div className="form-group col-4">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange = { e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" />
                </div>
                <div className="form-group col-1">
                    <label htmlFor="rating">Rating</label>
                    <div>
                        <select value={rating} onChange = { e => setRating(e.target.value)} id="rating" className="form-control">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="form-group col-5">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText} onChange = { e => setReviewText(e.target.value)} id="review" className="form-control"></textarea>
                </div>
            </div>
            <div className="text-center my-3">
                <button onClick = {handleSubmitReview} className="btn btn-primary mb-3">
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddReview