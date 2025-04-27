/*
  # Update Menu Data

  This migration updates the menu data with all categories and items.
*/

-- Clear existing data
TRUNCATE categories CASCADE;

-- Insert all categories
INSERT INTO categories (name, slug) VALUES
  ('Tiffins', 'tiffins'),
  ('Fast Food', 'fast-food'),
  ('Curries', 'curries'),
  ('Drinks', 'drinks'),
  ('Juices', 'juices'),
  ('Mocktails', 'mocktails'),
  ('Hot N Crunch', 'hot-n-crunch'),
  ('Snacks', 'snacks'),
  ('Tea Corner', 'tea-corner');

-- Insert Tiffins
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Idly', 'Soft and fluffy steamed rice cakes served with chutney and sambar', 30, 120, true, 'https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Bajji', 'Crispy fritters made with gram flour and vegetables', 25, 180, true, 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Puri', 'Deep-fried bread served with potato curry', 40, 300, true, 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Chapathi', 'Whole wheat flatbread served with curry', 35, 200, true, 'https://images.pexels.com/photos/2474659/pexels-photo-2474659.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Parota', 'Layered flatbread served with curry', 45, 280, true, 'https://images.pexels.com/photos/2474660/pexels-photo-2474660.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Plain Dosa', 'Crispy rice crepe', 40, 180, true, 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Masala Dosa', 'Crispy rice crepe filled with spiced potato', 60, 250, true, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Egg Dosa', 'Dosa with beaten egg spread', 50, 220, true, 'https://images.pexels.com/photos/5560761/pexels-photo-5560761.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Double Egg Dosa', 'Dosa with double portion of egg', 70, 280, true, 'https://images.pexels.com/photos/5560760/pexels-photo-5560760.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Rava Dosa', 'Crispy semolina crepe', 55, 200, true, 'https://images.pexels.com/photos/5560759/pexels-photo-5560759.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Minapappu Dosa', 'Dosa with lentil paste', 65, 230, true, 'https://images.pexels.com/photos/5560758/pexels-photo-5560758.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Pesarattu', 'Green gram dosa', 45, 190, true, 'https://images.pexels.com/photos/5560757/pexels-photo-5560757.jpeg');

-- Insert Fast Food
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Veg Fried Rice (Full)', 'Rice stir-fried with mixed vegetables', 120, 450, true, 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Veg Fried Rice (Half)', 'Half portion of vegetable fried rice', 70, 225, true, 'https://images.pexels.com/photos/723199/pexels-photo-723199.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Egg Fried Rice (Full)', 'Rice stir-fried with eggs and vegetables', 140, 500, true, 'https://images.pexels.com/photos/723200/pexels-photo-723200.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Egg Fried Rice (Half)', 'Half portion of egg fried rice', 80, 250, true, 'https://images.pexels.com/photos/723201/pexels-photo-723201.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Chicken Fried Rice (Full)', 'Rice stir-fried with chicken and vegetables', 160, 550, true, 'https://images.pexels.com/photos/723202/pexels-photo-723202.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Chicken Fried Rice (Half)', 'Half portion of chicken fried rice', 90, 275, true, 'https://images.pexels.com/photos/723203/pexels-photo-723203.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Veg Biryani (Full)', 'Aromatic rice dish with vegetables and spices', 140, 480, true, 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Veg Biryani (Half)', 'Half portion of vegetable biryani', 80, 240, true, 'https://images.pexels.com/photos/7394820/pexels-photo-7394820.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Chicken Dum Biryani (Full)', 'Traditional slow-cooked chicken biryani', 180, 600, true, 'https://images.pexels.com/photos/7394821/pexels-photo-7394821.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Chicken Dum Biryani (Half)', 'Half portion of chicken dum biryani', 100, 300, true, 'https://images.pexels.com/photos/7394822/pexels-photo-7394822.jpeg');

-- Insert Curries
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Chicken Curry', 'Spicy chicken curry', 120, 350, true, 'https://images.pexels.com/photos/2474662/pexels-photo-2474662.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Fish Curry', 'Traditional fish curry', 130, 300, true, 'https://images.pexels.com/photos/2474663/pexels-photo-2474663.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Egg Curry', 'Boiled eggs in spicy gravy', 90, 280, true, 'https://images.pexels.com/photos/2474664/pexels-photo-2474664.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Sambar', 'Lentil-based vegetable stew', 50, 150, true, 'https://images.pexels.com/photos/2474665/pexels-photo-2474665.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Mixed Veg Curry', 'Assorted vegetables in spicy gravy', 80, 200, true, 'https://images.pexels.com/photos/2474666/pexels-photo-2474666.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Dal Fry', 'Spiced yellow lentils', 70, 180, true, 'https://images.pexels.com/photos/2474667/pexels-photo-2474667.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Palak Paneer', 'Cottage cheese in spinach gravy', 100, 250, true, 'https://images.pexels.com/photos/2474668/pexels-photo-2474668.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'curries'), 'Aloo Gobi', 'Potato and cauliflower curry', 80, 220, true, 'https://images.pexels.com/photos/2474669/pexels-photo-2474669.jpeg');

-- Insert Drinks
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Maaza (200ml)', 'Mango flavored drink', 20, 150, true, 'https://images.pexels.com/photos/2474670/pexels-photo-2474670.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Maaza (500ml)', 'Mango flavored drink', 35, 375, true, 'https://images.pexels.com/photos/2474671/pexels-photo-2474671.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Maaza (1L)', 'Mango flavored drink', 60, 750, true, 'https://images.pexels.com/photos/2474672/pexels-photo-2474672.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Sprite (200ml)', 'Lemon-lime carbonated drink', 20, 140, true, 'https://images.pexels.com/photos/2474673/pexels-photo-2474673.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Sprite (500ml)', 'Lemon-lime carbonated drink', 35, 350, true, 'https://images.pexels.com/photos/2474674/pexels-photo-2474674.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Sprite (1L)', 'Lemon-lime carbonated drink', 60, 700, true, 'https://images.pexels.com/photos/2474675/pexels-photo-2474675.jpeg');

-- Insert Juices
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Banana Juice', 'Fresh banana juice', 40, 150, true, 'https://images.pexels.com/photos/2474676/pexels-photo-2474676.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Pineapple Juice', 'Fresh pineapple juice', 45, 120, true, 'https://images.pexels.com/photos/2474677/pexels-photo-2474677.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Orange Juice', 'Fresh orange juice', 40, 110, true, 'https://images.pexels.com/photos/2474678/pexels-photo-2474678.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Grape Juice', 'Fresh grape juice', 45, 140, true, 'https://images.pexels.com/photos/2474679/pexels-photo-2474679.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Carrot Juice', 'Fresh carrot juice', 35, 95, true, 'https://images.pexels.com/photos/2474680/pexels-photo-2474680.jpeg');

-- Insert Mocktails
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'mocktails'), 'Virgin Mojito', 'Mint and lime refresher', 60, 120, true, 'https://images.pexels.com/photos/2474681/pexels-photo-2474681.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'mocktails'), 'Blue Lagoon', 'Blue curacao flavored mocktail', 70, 150, true, 'https://images.pexels.com/photos/2474682/pexels-photo-2474682.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'mocktails'), 'Fruit Punch', 'Mixed fruit mocktail', 65, 140, true, 'https://images.pexels.com/photos/2474683/pexels-photo-2474683.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'mocktails'), 'Mango Tango', 'Mango based mocktail', 70, 160, true, 'https://images.pexels.com/photos/2474684/pexels-photo-2474684.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'mocktails'), 'Orange Sunrise', 'Orange and grenadine mocktail', 65, 130, true, 'https://images.pexels.com/photos/2474685/pexels-photo-2474685.jpeg');

-- Insert Hot N Crunch
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'hot-n-crunch'), 'Margherita Pizza', 'Classic tomato and cheese pizza', 150, 800, true, 'https://images.pexels.com/photos/2474686/pexels-photo-2474686.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'hot-n-crunch'), 'Veg Supreme Pizza', 'Loaded vegetable pizza', 180, 850, true, 'https://images.pexels.com/photos/2474687/pexels-photo-2474687.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'hot-n-crunch'), 'Chicken Pizza', 'Spicy chicken topped pizza', 200, 900, true, 'https://images.pexels.com/photos/2474688/pexels-photo-2474688.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'hot-n-crunch'), 'Veg Burger', 'Vegetable patty burger', 80, 450, true, 'https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'hot-n-crunch'), 'Chicken Burger', 'Chicken patty burger', 100, 500, true, 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'hot-n-crunch'), 'French Fries', 'Crispy potato fries', 60, 300, true, 'https://images.pexels.com/photos/2474691/pexels-photo-2474691.jpeg');

-- Insert Snacks
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'snacks'), 'Assorted Biscuits', 'Various types of biscuits', 20, 150, true, 'https://images.pexels.com/photos/2474692/pexels-photo-2474692.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'snacks'), 'Potato Chips', 'Crispy potato chips', 20, 160, true, 'https://images.pexels.com/photos/2474693/pexels-photo-2474693.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'snacks'), 'Popcorn', 'Buttered popcorn', 30, 120, true, 'https://images.pexels.com/photos/2474694/pexels-photo-2474694.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'snacks'), 'Chocolate Bars', 'Various chocolate bars', 40, 250, true, 'https://images.pexels.com/photos/2474695/pexels-photo-2474695.jpeg');

-- Insert Tea Corner
INSERT INTO menu_items (category_id, name, description, price, calories, available, image_url) VALUES
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Ginger Tea', 'Tea with fresh ginger', 15, 60, true, 'https://images.pexels.com/photos/2474696/pexels-photo-2474696.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Green Tea', 'Healthy green tea', 20, 5, true, 'https://images.pexels.com/photos/2474697/pexels-photo-2474697.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Coffee', 'Fresh brewed coffee', 20, 100, true, 'https://images.pexels.com/photos/2474698/pexels-photo-2474698.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Black Tea', 'Strong black tea', 15, 40, true, 'https://images.pexels.com/photos/2474699/pexels-photo-2474699.jpeg'),
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Masala Chai', 'Spiced Indian tea', 20, 80, true, 'https://images.pexels.com/photos/2474700/pexels-photo-2474700.jpeg');