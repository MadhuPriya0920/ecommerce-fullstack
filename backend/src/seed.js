const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const products = [
  // Electronics
  { name: 'iPhone 15 Pro', description: 'Latest Apple smartphone with A17 Pro chip and titanium design', price: 134900, category: 'Electronics', stock: 20, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&fit=crop' },
  { name: 'Samsung Galaxy S24 Ultra', description: 'Flagship Android phone with S Pen and 200MP camera', price: 129999, category: 'Electronics', stock: 15, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&fit=crop' },
  { name: 'MacBook Air M2', description: 'Superfast thin and light laptop with Apple M2 chip', price: 114900, category: 'Electronics', stock: 10, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&fit=crop' },
  { name: 'Sony WH-1000XM5 Headphones', description: 'Industry leading noise cancelling wireless headphones', price: 29990, category: 'Electronics', stock: 25, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&fit=crop' },
  { name: 'iPad Pro 12.9 M2', description: 'Powerful tablet with M2 chip and Liquid Retina XDR display', price: 112900, category: 'Electronics', stock: 12, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&fit=crop' },
  { name: 'Dell XPS 15 Laptop', description: 'Premium Windows laptop with OLED display and Intel i9', price: 189990, category: 'Electronics', stock: 8, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&fit=crop' },
  { name: 'Apple Watch Series 9', description: 'Advanced smartwatch with health and fitness tracking', price: 41900, category: 'Electronics', stock: 18, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&fit=crop' },
  { name: 'Sony PlayStation 5', description: 'Next generation gaming console with DualSense controller', price: 54990, category: 'Electronics', stock: 10, image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&fit=crop' },
  { name: 'LG 55 inch OLED TV', description: '55 inch 4K OLED Smart TV with WebOS and Dolby Vision', price: 89990, category: 'Electronics', stock: 7, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&fit=crop' },
  { name: 'JBL Flip 6 Speaker', description: 'Portable waterproof Bluetooth speaker with 12hr battery', price: 9999, category: 'Electronics', stock: 30, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&fit=crop' },
  { name: 'Canon EOS R50 Camera', description: 'Compact mirrorless camera perfect for content creators', price: 64995, category: 'Electronics', stock: 10, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&fit=crop' },
  { name: 'Kindle Paperwhite', description: 'Waterproof e-reader with 300 ppi glare-free display', price: 13999, category: 'Electronics', stock: 35, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&fit=crop' },
  { name: 'GoPro Hero 12 Black', description: 'Action camera with HyperSmooth 6.0 video stabilization', price: 44990, category: 'Electronics', stock: 14, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&fit=crop' },
  { name: 'Logitech MX Master 3S', description: 'Advanced wireless mouse for creative professionals', price: 9995, category: 'Electronics', stock: 28, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&fit=crop' },
  { name: 'Samsung 32 inch Monitor', description: '4K UHD curved gaming monitor with HDR1000', price: 45990, category: 'Electronics', stock: 12, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&fit=crop' },
  { name: 'Bose QuietComfort Earbuds', description: 'True wireless noise cancelling earbuds with 24hr battery', price: 24900, category: 'Electronics', stock: 20, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&fit=crop' },
  { name: 'Nintendo Switch OLED', description: 'Hybrid gaming console with vibrant 7 inch OLED screen', price: 29999, category: 'Electronics', stock: 16, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&fit=crop' },
  { name: 'Anker 26800mAh Power Bank', description: 'High capacity portable charger with fast charging 65W', price: 3999, category: 'Electronics', stock: 50, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&fit=crop' },
  { name: 'Mechanical Keyboard', description: 'RGB backlit mechanical gaming keyboard with Cherry MX switches', price: 7999, category: 'Electronics', stock: 22, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&fit=crop' },
  { name: 'Webcam 4K Logitech', description: '4K Ultra HD webcam with auto light correction for streaming', price: 12990, category: 'Electronics', stock: 18, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&fit=crop' },

  // Fashion
  { name: 'Levis 511 Slim Jeans', description: 'Classic slim fit jeans in dark indigo wash denim', price: 3999, category: 'Fashion', stock: 50, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&fit=crop' },
  { name: 'Nike Dri-FIT T-Shirt', description: 'Moisture wicking performance athletic t-shirt for workouts', price: 1499, category: 'Fashion', stock: 60, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&fit=crop' },
  { name: 'Zara Floral Midi Dress', description: 'Elegant floral print midi dress perfect for any occasion', price: 3490, category: 'Fashion', stock: 25, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop' },
  { name: 'H&M Oversized Hoodie', description: 'Comfortable relaxed fit cotton blend pullover hoodie', price: 1999, category: 'Fashion', stock: 45, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&fit=crop' },
  { name: 'Ray-Ban Aviator Sunglasses', description: 'Iconic polarized aviator sunglasses with gold metal frame', price: 8490, category: 'Fashion', stock: 20, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&fit=crop' },
  { name: 'Genuine Leather Wallet', description: 'Premium slim genuine leather bifold wallet with RFID block', price: 1299, category: 'Fashion', stock: 40, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&fit=crop' },
  { name: 'Tommy Hilfiger Polo Shirt', description: 'Classic cotton pique polo shirt with embroidered logo', price: 2999, category: 'Fashion', stock: 35, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&fit=crop' },
  { name: 'Adidas Track Jacket', description: 'Iconic 3-stripe zip-up track jacket in multiple colors', price: 4999, category: 'Fashion', stock: 30, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&fit=crop' },
  { name: 'Denim Jacket Classic', description: 'Timeless blue denim jacket with button closure and pockets', price: 2999, category: 'Fashion', stock: 35, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&fit=crop' },
  { name: 'Cotton Kurta Set', description: 'Traditional hand-block printed cotton kurta with matching pants', price: 1799, category: 'Fashion', stock: 30, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&fit=crop' },
  { name: 'Silk Saree Kanchipuram', description: 'Handwoven Kanchipuram pure silk saree with golden zari border', price: 8999, category: 'Fashion', stock: 15, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&fit=crop' },
  { name: 'Leather Belt Premium', description: 'Genuine leather reversible dress belt with metal buckle', price: 999, category: 'Fashion', stock: 55, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&fit=crop' },
  { name: 'Woolen Plaid Scarf', description: 'Soft merino wool scarf in classic tartan plaid pattern', price: 1499, category: 'Fashion', stock: 40, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&fit=crop' },
  { name: 'Snapback Baseball Cap', description: 'Adjustable structured cotton twill snapback baseball cap', price: 799, category: 'Fashion', stock: 60, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&fit=crop' },
  { name: 'Formal Blazer Men', description: 'Single breasted slim fit formal blazer for office wear', price: 5999, category: 'Fashion', stock: 20, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&fit=crop' },

  // Footwear
  { name: 'Nike Air Force 1 White', description: 'Iconic basketball shoes turned streetwear legend in white', price: 7495, category: 'Footwear', stock: 40, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop' },
  { name: 'Adidas Ultraboost 23', description: 'Premium running shoes with responsive Boost midsole cushioning', price: 16999, category: 'Footwear', stock: 22, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&fit=crop' },
  { name: 'Converse Chuck Taylor High', description: 'All Star high top canvas sneakers timeless street classic', price: 4995, category: 'Footwear', stock: 45, image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&fit=crop' },
  { name: 'Woodland Trekking Boots', description: 'Waterproof rugged leather boots for outdoor hiking adventures', price: 5999, category: 'Footwear', stock: 18, image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&fit=crop' },
  { name: 'Puma Suede Classic', description: 'Legendary suede sneakers with formstrip branding', price: 6999, category: 'Footwear', stock: 30, image: 'https://images.unsplash.com/photo-1561861422-a549073e547a?w=400&fit=crop' },
  { name: 'Vans Old Skool Black', description: 'Classic skate shoe with iconic side stripe in black white', price: 5995, category: 'Footwear', stock: 35, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&fit=crop' },
  { name: 'Red Tape Oxford Shoes', description: 'Premium leather Oxford formal shoes with leather sole', price: 3999, category: 'Footwear', stock: 30, image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&fit=crop' },
  { name: 'Nike Flip Flops', description: 'Ultra soft foam comfort slide sandals for casual wear', price: 1299, category: 'Footwear', stock: 60, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&fit=crop' },
  { name: 'Birkenstock Arizona', description: 'Two strap leather sandal with contoured cork footbed', price: 8999, category: 'Footwear', stock: 25, image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&fit=crop' },
  { name: 'New Balance 574', description: 'Lifestyle sneaker with ENCAP midsole technology', price: 8495, category: 'Footwear', stock: 28, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&fit=crop' },

  // Home & Kitchen
  { name: 'Instant Pot Duo 7-in-1', description: 'Multi-use electric pressure cooker 6 quart capacity', price: 8999, category: 'Home & Kitchen', stock: 15, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&fit=crop' },
  { name: 'Philips Air Fryer XXL', description: 'Digital air fryer 7.3L with rapid hot air technology', price: 12995, category: 'Home & Kitchen', stock: 20, image: 'https://images.unsplash.com/photo-1648169673822-a8673a7e1b4a?w=400&fit=crop' },
  { name: 'Nespresso Coffee Machine', description: 'Compact capsule espresso machine with milk frother', price: 14990, category: 'Home & Kitchen', stock: 12, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&fit=crop' },
  { name: 'KitchenAid Stand Mixer', description: 'Professional 5Qt artisan series tilt-head stand mixer', price: 45000, category: 'Home & Kitchen', stock: 8, image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&fit=crop' },
  { name: 'Bamboo Cutting Board Set', description: 'Set of 3 eco-friendly organic bamboo cutting boards', price: 1299, category: 'Home & Kitchen', stock: 40, image: 'https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=400&fit=crop' },
  { name: 'Borosil Glass Bowl Set', description: 'Set of 6 borosilicate microwave safe mixing glass bowls', price: 999, category: 'Home & Kitchen', stock: 45, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&fit=crop' },
  { name: 'Milton Steel Flask Set', description: 'Stainless steel insulated hot and cold water bottle set of 3', price: 899, category: 'Home & Kitchen', stock: 55, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&fit=crop' },
  { name: 'Smart LED Bulb Pack', description: 'WiFi enabled 16 million color smart bulbs pack of 4', price: 1999, category: 'Home & Kitchen', stock: 40, image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&fit=crop' },
  { name: 'King Size Bedsheet Set', description: 'King size 400 thread count pure cotton 3 piece bedsheet set', price: 2499, category: 'Home & Kitchen', stock: 25, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&fit=crop' },
  { name: 'Scented Candle Gift Set', description: 'Luxury soy wax scented candles set of 3 lavender and vanilla', price: 1499, category: 'Home & Kitchen', stock: 35, image: 'https://images.unsplash.com/photo-1603905786007-f18e1bba3c4c?w=400&fit=crop' },
  { name: 'Minimalist Wall Clock', description: 'Silent sweep minimalist wooden wall clock 30cm diameter', price: 1299, category: 'Home & Kitchen', stock: 30, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&fit=crop' },
  { name: 'Prestige Pressure Cooker', description: 'Hard anodised aluminium pressure cooker 5L with safety valve', price: 2499, category: 'Home & Kitchen', stock: 30, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&fit=crop' },

  // Books
  { name: 'Atomic Habits', description: 'Tiny changes remarkable results by James Clear', price: 499, category: 'Books', stock: 100, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&fit=crop' },
  { name: 'The Alchemist', description: 'Paulo Coelho masterpiece about following your dreams', price: 299, category: 'Books', stock: 80, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&fit=crop' },
  { name: 'Rich Dad Poor Dad', description: 'Robert Kiyosaki personal finance and investing classic', price: 399, category: 'Books', stock: 90, image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&fit=crop' },
  { name: 'Sapiens', description: 'A brief history of humankind by Yuval Noah Harari', price: 599, category: 'Books', stock: 65, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&fit=crop' },
  { name: 'Deep Work', description: 'Rules for focused success in a distracted world by Cal Newport', price: 449, category: 'Books', stock: 70, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&fit=crop' },
  { name: 'Harry Potter Box Set', description: 'Complete 7 book hardcover collector box set', price: 3999, category: 'Books', stock: 30, image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&fit=crop' },
  { name: 'The Psychology of Money', description: 'Timeless lessons on wealth greed and happiness by Morgan Housel', price: 449, category: 'Books', stock: 75, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&fit=crop' },
  { name: 'Zero to One', description: 'Peter Thiel notes on startups and building the future', price: 549, category: 'Books', stock: 60, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&fit=crop' },
  { name: 'Think and Grow Rich', description: 'Napoleon Hill classic guide to success mindset and achievement', price: 299, category: 'Books', stock: 85, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&fit=crop' },
  { name: 'The Subtle Art', description: 'A counterintuitive approach to living a good life by Mark Manson', price: 399, category: 'Books', stock: 70, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&fit=crop' },

  // Sports
  { name: 'Yoga Mat Premium TPE', description: 'Non-slip 6mm thick eco-friendly TPE exercise yoga mat', price: 1499, category: 'Sports', stock: 45, image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&fit=crop' },
  { name: 'Resistance Bands Set', description: 'Set of 5 latex resistance bands with handles for home workouts', price: 899, category: 'Sports', stock: 60, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&fit=crop' },
  { name: 'Adjustable Dumbbell Set', description: 'Space saving adjustable dumbbells 2-24kg with storage rack', price: 12999, category: 'Sports', stock: 15, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&fit=crop' },
  { name: 'Fitbit Charge 6', description: 'Advanced fitness tracker with built-in GPS and health monitoring', price: 14999, category: 'Sports', stock: 20, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&fit=crop' },
  { name: 'Whey Protein Gold Standard', description: 'ON Gold Standard 100% Whey protein 2lb double chocolate', price: 3499, category: 'Sports', stock: 35, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&fit=crop' },
  { name: 'Badminton Racket Set', description: 'Yonex GR-303 racket pair with shuttlecocks and carry bag', price: 1999, category: 'Sports', stock: 25, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&fit=crop' },
  { name: 'Nike Strike Football', description: 'FIFA quality pro match football size 5 with textured casing', price: 2499, category: 'Sports', stock: 30, image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&fit=crop' },
  { name: 'Speed Jump Rope', description: 'Adjustable ball bearing speed jump rope for crossfit training', price: 799, category: 'Sports', stock: 55, image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=400&fit=crop' },
  { name: 'Cricket Bat Kashmir Willow', description: 'Premium Kashmir willow full size cricket bat with grip', price: 2999, category: 'Sports', stock: 20, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&fit=crop' },
  { name: 'Swimming Goggles Pro', description: 'Anti-fog UV protection competitive swimming goggles', price: 999, category: 'Sports', stock: 40, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&fit=crop' },

  // Beauty
  { name: 'Maybelline Fit Me Foundation', description: 'Natural coverage liquid foundation for all skin types SPF18', price: 599, category: 'Beauty', stock: 50, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&fit=crop' },
  { name: 'Nivea Body Lotion 400ml', description: 'Deep moisture 48 hour nourishing body lotion for dry skin', price: 349, category: 'Beauty', stock: 70, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&fit=crop' },
  { name: 'The Ordinary Hyaluronic Serum', description: 'Hyaluronic acid 2% and B5 deep hydration face serum 30ml', price: 1490, category: 'Beauty', stock: 35, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&fit=crop' },
  { name: 'Himalaya Purifying Face Wash', description: 'Neem and turmeric purifying face wash for oily skin 150ml', price: 199, category: 'Beauty', stock: 80, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&fit=crop' },
  { name: 'Forest Essentials Face Oil', description: 'Luxury 24 carat gold facial nourishing oil with saffron', price: 2950, category: 'Beauty', stock: 20, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&fit=crop' },
  { name: 'Dove Intense Repair Shampoo', description: 'Intensive repair shampoo for damaged and frizzy hair 650ml', price: 399, category: 'Beauty', stock: 60, image: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&fit=crop' },
  { name: 'Professional Makeup Brush Set', description: '15 piece vegan synthetic makeup brush set with leather case', price: 1299, category: 'Beauty', stock: 30, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&fit=crop' },
  { name: 'Biotique SPF 50 Sunscreen', description: 'Ultra soothing bio carrot face sunscreen for sensitive skin', price: 299, category: 'Beauty', stock: 55, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&fit=crop' },
  { name: 'Lakme Absolute Lipstick', description: 'Long lasting matte finish lipstick in rich bold shades', price: 599, category: 'Beauty', stock: 45, image: 'https://images.unsplash.com/photo-1631214524020-3c69f38d38d6?w=400&fit=crop' },
  { name: 'Mamaearth Vitamin C Cream', description: 'Brightening vitamin C face cream with turmeric for glow', price: 449, category: 'Beauty', stock: 50, image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&fit=crop' },

  // Toys
  { name: 'LEGO Classic 1500 Pieces', description: 'Creative colorful building bricks set with storage box', price: 4999, category: 'Toys', stock: 25, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&fit=crop' },
  { name: 'Remote Control Racing Car', description: 'High speed 1:16 scale 4WD off-road RC racing buggy', price: 2499, category: 'Toys', stock: 30, image: 'https://images.unsplash.com/photo-1594787317571-4a8dbcf5a9a4?w=400&fit=crop' },
  { name: 'Monopoly Classic Board Game', description: 'Original family property trading board game 2-6 players', price: 1299, category: 'Toys', stock: 40, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&fit=crop' },
  { name: "Rubik's Cube 3x3", description: 'Original speed cube puzzle brain teaser toy for all ages', price: 499, category: 'Toys', stock: 60, image: 'https://images.unsplash.com/photo-1591991731833-b4807cf7ca37?w=400&fit=crop' },
  { name: 'Wooden Chess Set', description: 'Handcrafted premium wooden chess board with weighted pieces', price: 1499, category: 'Toys', stock: 22, image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&fit=crop' },
  { name: 'UNO Card Game', description: 'Classic UNO card game for 2-10 players family party fun', price: 499, category: 'Toys', stock: 65, image: 'https://images.unsplash.com/photo-1606503479586-2b0c3a0b4cc0?w=400&fit=crop' },
  { name: 'Play-Doh 10 Color Pack', description: 'Classic non-toxic modeling compound 10 color variety pack', price: 799, category: 'Toys', stock: 50, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&fit=crop' },
  { name: 'Funskool Scrabble', description: 'Classic word building family board game 2-4 players', price: 999, category: 'Toys', stock: 35, image: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&fit=crop' },
  { name: 'Hot Wheels 20 Car Pack', description: 'Die cast 1:64 scale Hot Wheels cars assorted 20 pack', price: 1999, category: 'Toys', stock: 35, image: 'https://images.unsplash.com/photo-1594787317571-4a8dbcf5a9a4?w=400&fit=crop' },
  { name: 'Crayola 64 Crayon Box', description: 'Classic 64 count crayon box with built-in sharpener', price: 699, category: 'Toys', stock: 55, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&fit=crop' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('MongoDB Connected');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedDB();