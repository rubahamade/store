import React from 'react';

const Reviews = ({ reviews, products }) => {

    return (
        <div>
            <h2>Reviews</h2>
            <ul>
                {
                products.map(product => (
                     <li key={product.id}>
                        {product.name}
                            <ul>
                                {
                                    reviews.filter(review => review.product_id === product.id)
                                        .map(review => (
                                            <li key={review.id}>
                                                Rating {review.rating}: "{review.txt}"
                                            </li>
                                        ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Reviews;