import React from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 p-4 text-white text-center text-xl font-bold">
        Gestión de Productos
      </header>
      <ProductList />
    </div>
  );
}

export default App;
