import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import UpdatePage from './routes/UpdatePage'
import Home from './routes/Home'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

const App = () =>{
    return (
    <RestaurantsContextProvider>
        <div className='container bg-secondary'>
            <Router>
                {/* allows you to stop searching once you find it.  */}
                <Routes> 
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/restaurants/:id/update" element={<UpdatePage/>}/>
                <Route exact path="/restaurants/:id" element={<RestaurantDetailPage/>}/>
                </Routes>
            </Router>
        </div>
    </RestaurantsContextProvider>
    )
}

export default App