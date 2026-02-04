import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <header style={headerStyle}>
        <Link to="/" style={logoStyle}>DecryptCode Shop</Link>
        <nav style={navStyle}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}

const headerStyle: React.CSSProperties = {
  padding: '1rem 2rem',
  background: '#1e3a5f',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle: React.CSSProperties = { color: '#fff', fontWeight: 'bold', fontSize: '1.25rem' };
const navStyle: React.CSSProperties = { display: 'flex', gap: '1.5rem' };
const mainStyle: React.CSSProperties = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };
