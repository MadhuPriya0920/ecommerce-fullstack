import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updated = cart.map(item =>
      item._id === id ? { ...item, quantity } : item
    );
    setCart(updated);
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(updated));
    toast.success('Item removed');
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!user) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setLoading(true);
    try {
      const orderItems = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        product: item._id
      }));
      await API.post('/orders', {
        orderItems,
        shippingAddress: {
          address: '123 Main Street',
          city: 'Bangalore',
          pincode: '560001',
          country: 'India'
        },
        totalPrice
      });
      localStorage.removeItem(`cart_${user._id}`);
      setCart([]);
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} style={styles.card}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
                onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=No+Image'; }}
              />
              <div style={styles.info}>
                <h3>{item.name}</h3>
                <p style={styles.price}>₹{item.price}</p>
              </div>
              <div style={styles.controls}>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <p style={styles.subtotal}>₹{item.price * item.quantity}</p>
              <button style={styles.removeBtn} onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          ))}
          <div style={styles.total}>
            <h3>Total: ₹{totalPrice}</h3>
            <button style={styles.orderBtn} onClick={placeOrder} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '2rem', color: '#333' },
  empty: { textAlign: 'center', color: '#888', fontSize: '1.1rem' },
  card: { display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1rem' },
  image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  price: { color: '#4f46e5', fontWeight: 'bold' },
  controls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  qtyBtn: { background: '#4f46e5', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  qty: { fontSize: '1rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center' },
  subtotal: { fontWeight: 'bold', minWidth: '80px', textAlign: 'right' },
  removeBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' },
  total: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '1rem' },
  orderBtn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }
};

export default CartPage;