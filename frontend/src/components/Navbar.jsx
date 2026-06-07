import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out!');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🛒 ShopNow</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        {user ? (
          <>
            <Link to="/cart" style={styles.link}>Cart</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            {user.role === 'admin' && (
              <Link to="/admin" style={styles.link}>Admin</Link>
            )}
            <span style={styles.username}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { background: '#4f46e5', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' },
  links: { display: 'flex', alignItems: 'center', gap: '1rem' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '1rem' },
  username: { color: '#c7d2fe', fontSize: '0.9rem' },
  button: { background: '#fff', color: '#4f46e5', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Navbar;