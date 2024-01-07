import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Link, HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Reviews from './Reviews'

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  let location = useLocation()

  function fetchProducts() {
    const fetchData = async () => {
      const response = await axios.get('/api/products');
      const sortedProducts = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(response.data);
      setProducts(sortedProducts);
    };
    fetchData();
  }

  useEffect(()=> {
    fetchProducts()
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/lineItems');
      setLineItems(response.data);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/reviews');
      console.log(response)
      setReviews(response.data);
    };
    fetchData();
  }, []);

  const cart = orders.find((order) => {return order.is_cart});
  if(!cart){
    return null;
  }

  const createLineItem = async(product)=> {
    const response = await axios.post('/api/lineItems', {
      order_id: cart.id,
      product_id: product.id
    });
    setLineItems([...lineItems, response.data]);
  };

  const updateLineItem = async(lineItem)=> {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity + 1,
      order_id: cart.id
    });
    setLineItems(lineItems.map( (lineItem) => {
      return lineItem.id === response.data.id ? response.data: lineItem
    }));
  };

  const decrementQuantity = async (lineItem) => {
    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity - 1,
      order_id: cart.id
    });
    setLineItems(lineItems.map((lineItem) => {
      return lineItem.id === response.data.id ? response.data : lineItem
    }));  
  }

  const updateOrder = async(order)=> {
    await axios.put(`/api/orders/${order.id}`, order);
    const response = await axios.get('/api/orders');
    setOrders(response.data);
  };

  const removeFromCart = async(lineItem)=> {
    await axios.delete(`/api/lineItems/${lineItem.id}`);
    setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
  };

  const cartItems = lineItems.filter((lineItem) => {
    return lineItem.order_id === cart.id
  });

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const cartTotal = cartItems.reduce((acc, item) => {
    const product = products.find(p => p.id === item.product_id);
    if (product) {
      return acc += product.price / 100 * item.quantity;
    } else {
      return acc;
    }
  }, 0);


  return (
    <div>
      <nav>
        <Link to='/products'>Products ({ products.length })</Link>
        <Link to='/orders'>Orders ({ orders.filter((order) => {return !order.is_cart}).length })</Link>
        <Link to='/cart'>Cart ({cartCount })</Link>
      </nav>

      <div>
        {location.pathname === '/products' && (
          <Products
            products={products}
            cartItems={cartItems}
            createLineItem={createLineItem}
            updateLineItem={updateLineItem}
            fetchProducts={fetchProducts}
          />
        )}
        {location.pathname === '/orders' && (
          <Orders
            orders={orders}
            products={products}
            lineItems={lineItems}
          />
        )}
        {location.pathname === '/cart' && (
          <Cart
            cart={cart}
            lineItems={lineItems}
            products={products}
            updateOrder={updateOrder}
            incrementQuantity={updateLineItem}
            decrementQuantity={decrementQuantity}
            cartTotal={cartTotal}
            removeFromCart={removeFromCart}
          />
        )}
        {location.pathname === '/reviews' && (
          <Reviews
            reviews={reviews}
            products={products}
          />
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
