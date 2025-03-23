import React, { useState } from 'react';
import axios from '../api/axios';

const CreateProductForm = ({ onProductCreated }) => {
  const [nameProduct, setNameProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [stockProduct, setStockProduct] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('products', {
        nameProduct,
        descriptionProduct,
        priceProduct,
        stockProduct,
      });
      onProductCreated(response.data); // Llamamos al callback para actualizar la lista de productos
      setNameProduct('');
      setDescriptionProduct('');
      setPriceProduct('');
      setStockProduct('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            value={descriptionProduct}
            onChange={(e) => setDescriptionProduct(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Price</label>
          <input
            type="number"
            value={priceProduct}
            onChange={(e) => setPriceProduct(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Stock</label>
          <input
            type="number"
            value={stockProduct}
            onChange={(e) => setStockProduct(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
