// import React from 'react'

// const StarRating = ({rating}) => {
//   const stars = []
//   for (let i = 1; i <=5; i++) {
//     if (i <= rating){
//         stars.push(<i class="fas fa-start"></i>)
//     } else {
//         stars.push(<i class="far fa-star"></i>)
//     }
//   }
// return <>{stars}</>
// }

// export default StarRating

import React from "react";

const StarRating = ({ rating }) => {
  //rating =4
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    } 
    else if (i === Math.ceil(rating) && !Number.isInteger(rating)) { //check to make sure number is not integer and also has decimals. 
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>);
    } 
    else {
      stars.push(<i key={i} className="far fa-star text-warning"></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;