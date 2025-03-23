import React, { useState, useEffect } from 'react';  // Asegúrate de que esta importación esté solo una vez
import ProductList from './components/ProductList';
import CreateProductForm from './components/CreateProductForm';
import axios from './api/axios';

const App = () => {
  const [products, setProducts] = useState([]);

  // Este hook puede ser útil para cargar los productos al iniciar la aplicación
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Este hook se ejecuta solo una vez al cargar el componente

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center py-4">Product Management</h1>
      <CreateProductForm onProductCreated={handleProductCreated} />
      <ProductList products={products} />
    </div>
  );
};

export default App;
