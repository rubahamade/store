import React, { useState } from 'react';

function CreateProductForm({ fetchProducts }) {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault();
        console.log('Create product ' + name + ' ' + desc + ' ' + price);
        const response = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, desc, price }),
        });

        fetchProducts();
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        if (value.trim() !== '') {
            setName(value);
        }
    };

    const handleDescChange = (event) => {
        const value = event.target.value;
        if (value.length <= 200) {
            setDesc(value);
        }
        
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (/^\d+$/.test(value)) {
            setPrice(value);
        }
    };

    return (
        <form onSubmit={handleCreate}>
            <label>
                Name: <input type="text" value={name} onChange={handleNameChange} /> 
            </label>
            <label>
                Description: <input type="text" value={desc} onChange={handleDescChange} /> 
            </label>
            <label>
                Price: <input type="text" value={price} onChange={handlePriceChange} /> 
            </label>
            <button>Create Product</button>
        </form>
    );
}

export default CreateProductForm;