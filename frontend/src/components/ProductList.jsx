import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ProductList = ({ setProducts }) => {
  const [products, setLocalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [nameProduct, setNameProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [stockProduct, setStockProduct] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); 
        setLocalProducts(response.data); 
        setProducts(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Eliminar producto
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      setLocalProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Actualizar producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        nameProduct,
        descriptionProduct,
        priceProduct,
        stockProduct,
      };
      await axios.put(`/products/${editingProduct.id}`, updatedProduct);
      setLocalProducts(products.map(product =>
        product.id === editingProduct.id ? { ...product, ...updatedProduct } : product
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-bold">Loading products...</p>;
  }

  return (
    <div className="container mx-auto p-4 align-center">
      <h1 className="text-2xl font-bold mb-4 ">Products</h1>
      {editingProduct ? (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <form onSubmit={handleUpdate} className="space-y-4 form-group">
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
              Update Product
            </button>
          </form>
        </div>
      ) : (
        <table className="min-w-full table-auto border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border">{product.nameProduct}</td>
                  <td className="px-4 py-2 border">{product.descriptionProduct}</td>
                  <td className="px-4 py-2 border">{product.priceProduct}</td>
                  <td className="px-4 py-2 border">{product.stockProduct}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
