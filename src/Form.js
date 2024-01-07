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
        const value = event.target.value * 100;
        if (/^\d+$/.test(value)) {
            setPrice(value);
        }
    };

    return (
        <form onSubmit={handleCreate}>
            <div className="label">
            <label>
                Name:
                <br/>
                <input type="text" value={name} onChange={handleNameChange} /> 
            </label>
            </div>

            <br/>

            <div className="label">
            <label>
                Description:
                <br/>
                <input type="text" value={desc} onChange={handleDescChange} /> 
            </label>
            </div>

            <br/>

            <div>
            <label>
                Price: 
                <br/>
                <input type="text" value={price} onChange={handlePriceChange} />
            </label>
            </div>

            <br/>
            
            <button>Create Product</button>
        </form>
    );
}

export default CreateProductForm;