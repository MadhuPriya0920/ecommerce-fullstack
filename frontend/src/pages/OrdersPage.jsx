import { useState, useEffect } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        toast.error('Failed to load orders');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={styles.loading}>Loading orders...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Orders</h2>
      {orders.length === 0 ? (
        <p style={styles.empty}>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={styles.card}>
            <div style={styles.header}>
              <span style={styles.id}>Order ID: {order._id}</span>
              <span style={{
                ...styles.status,
                background: order.status === 'delivered' ? '#22c55e' :
                  order.status === 'shipped' ? '#3b82f6' :
                  order.status === 'cancelled' ? '#ef4444' : '#f59e0b'
              }}>{order.status.toUpperCase()}</span>
            </div>
            {order.orderItems.map(item => (
              <div key={item._id} style={styles.item}>
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <div style={styles.footer}>
              <span>Total: ₹{order.totalPrice}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '2rem', color: '#333' },
  empty: { textAlign: 'center', color: '#888' },
  loading: { textAlign: 'center', marginTop: '5rem', fontSize: '1.2rem' },
  card: { background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  id: { fontSize: '0.85rem', color: '#666' },
  status: { padding: '0.3rem 0.8rem', borderRadius: '20px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' },
  item: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' },
  footer: { display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold', color: '#4f46e5' }
};

export default OrdersPage;