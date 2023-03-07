import { Rating } from '@material-ui/lab';
import React from 'react';
import profilePng from "../../images/Profile.png";

const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        precision: 0.1,
        readOnly: true,
    };

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard