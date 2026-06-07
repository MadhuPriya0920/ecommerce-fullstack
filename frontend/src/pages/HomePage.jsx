import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Toys'];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        toast.error('Failed to load products');
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, activeCategory, products]);

  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Please login to add items to cart!');
      navigate('/login');
      return;
    }
    const cart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return (
    <div style={styles.loadingScreen}>
      <div style={styles.spinner}></div>
      <p>Loading products...</p>
    </div>
  );

  return (
    <div style={styles.page}>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🛒 Welcome to ShopNow</h1>
        <p style={styles.heroSub}>Discover amazing products at unbeatable prices</p>

        {/* Search Bar */}
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search for products, brands, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button style={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.categoryBar}>
        {categories.map(cat => (
          <button
            key={cat}
            style={{ ...styles.catBtn, ...(activeCategory === cat ? styles.activeCat : {}) }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div style={styles.resultInfo}>
        <span>{filtered.length} products {activeCategory !== 'All' ? `in ${activeCategory}` : ''} {search ? `for "${search}"` : ''}</span>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div style={styles.noResult}>
          <p style={{ fontSize: '3rem' }}>😕</p>
          <p>No products found. Try a different search!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(product => (
            <div key={product._id} style={styles.card}>
              <div style={styles.imageBox}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                <span style={styles.categoryBadge}>{product.category}</span>
                {product.stock === 0 && <span style={styles.outOfStock}>Out of Stock</span>}
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>
                <div style={styles.cardFooter}>
                  <div>
                    <p style={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
                    <p style={styles.stock}>
                      {product.stock > 0
                        ? <span style={{ color: '#22c55e' }}>✓ In Stock ({product.stock})</span>
                        : <span style={{ color: '#ef4444' }}>✗ Out of Stock</span>
                      }
                    </p>
                  </div>
                  <button
                    style={{ ...styles.addBtn, ...(product.stock === 0 ? styles.disabledBtn : {}) }}
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Sold Out' : '🛒 Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { background: '#f8fafc', minHeight: '100vh', paddingBottom: '3rem' },
  loadingScreen: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem', color: '#64748b' },
  spinner: { width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite' },

  hero: { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '3rem 2rem', textAlign: 'center' },
  heroTitle: { color: '#fff', fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' },
  heroSub: { color: '#c7d2fe', fontSize: '1.1rem', marginBottom: '2rem' },

  searchBox: { display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '50px', padding: '0.75rem 1.5rem', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' },
  searchIcon: { fontSize: '1.2rem', marginRight: '0.75rem' },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: '1rem', background: 'transparent' },
  clearBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1rem', padding: '0 0.25rem' },

  categoryBar: { display: 'flex', gap: '0.75rem', padding: '1.5rem 2rem', overflowX: 'auto', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flexWrap: 'wrap' },
  catBtn: { padding: '0.5rem 1.25rem', borderRadius: '50px', border: '2px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', transition: 'all 0.2s' },
  activeCat: { background: '#4f46e5', color: '#fff', borderColor: '#4f46e5' },

  resultInfo: { padding: '1rem 2rem', color: '#64748b', fontSize: '0.9rem' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', padding: '0 2rem' },

  card: { background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' },
  imageBox: { position: 'relative', overflow: 'hidden' },
  image: { width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' },
  categoryBadge: { position: 'absolute', top: '10px', left: '10px', background: 'rgba(79,70,229,0.9)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '600' },
  outOfStock: { position: 'absolute', top: '10px', right: '10px', background: 'rgba(239,68,68,0.9)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '600' },

  cardBody: { padding: '1rem' },
  name: { fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.4rem', lineHeight: '1.4' },
  description: { fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.75rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  price: { fontSize: '1.3rem', fontWeight: '800', color: '#4f46e5' },
  stock: { fontSize: '0.78rem', marginTop: '0.2rem' },

  addBtn: { background: '#4f46e5', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', whiteSpace: 'nowrap' },
  disabledBtn: { background: '#e2e8f0', color: '#94a3b8', cursor: 'not-allowed' },

  noResult: { textAlign: 'center', padding: '4rem', color: '#64748b' },
};

export default HomePage;