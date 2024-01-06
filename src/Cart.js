import React from 'react';

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, cartTotal, incrementQuantity, decrementQuantity, products })=> {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          lineItems.filter((lineItem) => {return lineItem.order_id === cart.id}).map( lineItem => {
            const product = products.find(product => product.id === lineItem.product_id) || {};
            return (
              <li key={ lineItem.id }>
                { product.name }
                ({ lineItem.quantity })<button onClick={() => { incrementQuantity(lineItem) } }>+</button><button onClick={() => { if(lineItem.quantity > 1) decrementQuantity(lineItem) }}>-</button>
                <p>${product.price/100 * lineItem.quantity}</p>
                <button onClick={ ()=> removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })
        }
      </ul>
      <div>Total: ${cartTotal}</div>
      {
        lineItems.filter((lineItem) => { return lineItem.order_id === cart.id }).length ? <button onClick={() => {
          updateOrder({ ...cart, is_cart: false });
        }}>Create Order</button> : <p>Add some items to your cart!</p>
      }
    </div>
  );
};

export default Cart;
