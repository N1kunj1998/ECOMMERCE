import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';



const ProductCard = ({product}) => {
  const options = {
    size: "large",
    value: product.ratings,
    precision: 0.1,
    readOnly: true,
  };

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <Rating {...options} /> <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`RS ${product.price}`}</span>
    </Link>
  )
}

export default ProductCard