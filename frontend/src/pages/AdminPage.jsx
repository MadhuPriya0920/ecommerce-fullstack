import { useState, useEffect } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', image: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        API.get('/products'),
        API.get('/orders')
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    }
    setLoading(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, form);
        toast.success('Product updated!');
      } else {
        await API.post('/products', form);
        toast.success('Product created!');
      }
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}`, { status });
      toast.success('Order status updated!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'products' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('products')}
        >Products ({products.length})</button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'orders' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('orders')}
        >Orders ({orders.length})</button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <button style={styles.addBtn} onClick={() => { setShowForm(!showForm); setEditProduct(null); setForm({ name: '', description: '', price: '', category: '', stock: '', image: '' }); }}>
            {showForm ? 'Cancel' : '+ Add Product'}
          </button>

          {showForm && (
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
              {['name', 'description', 'category', 'image'].map(field => (
                <input
                  key={field}
                  style={styles.input}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  required
                />
              ))}
              <input style={styles.input} type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <input style={styles.input} type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
              <button style={styles.submitBtn} type="submit">{editProduct ? 'Update Product' : 'Create Product'}</button>
            </form>
          )}

          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} style={styles.tr}>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>₹{product.price}</td>
                  <td style={styles.td}>{product.stock}</td>
                  <td style={styles.td}>
                    <button style={styles.editBtn} onClick={() => handleEdit(product)}>Edit</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={styles.tr}>
                <td style={styles.td}>{order._id.slice(-8)}</td>
                <td style={styles.td}>{order.user?.name || 'N/A'}</td>
                <td style={styles.td}>₹{order.totalPrice}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.status,
                    background: order.status === 'delivered' ? '#22c55e' :
                      order.status === 'shipped' ? '#3b82f6' :
                      order.status === 'cancelled' ? '#ef4444' : '#f59e0b'
                  }}>{order.status}</span>
                </td>
                <td style={styles.td}>
                  <select
                    style={styles.select}
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem' },
  title: { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  loading: { textAlign: 'center', marginTop: '5rem', fontSize: '1.2rem' },
  tabs: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
  tab: { padding: '0.6rem 1.5rem', border: '2px solid #4f46e5', borderRadius: '6px', cursor: 'pointer', background: '#fff', color: '#4f46e5', fontWeight: 'bold' },
  activeTab: { background: '#4f46e5', color: '#fff' },
  addBtn: { background: '#22c55e', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '1rem' },
  form: { background: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1.5rem' },
  input: { width: '100%', padding: '0.6rem', marginBottom: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
  submitBtn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  thead: { background: '#4f46e5' },
  th: { padding: '1rem', color: '#fff', textAlign: 'left' },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '0.75rem 1rem', color: '#333' },
  editBtn: { background: '#f59e0b', color: '#fff', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' },
  deleteBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
  status: { padding: '0.3rem 0.8rem', borderRadius: '20px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' },
  select: { padding: '0.3rem', borderRadius: '4px', border: '1px solid #ddd' }
};

export default AdminPage;