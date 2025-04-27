/*
  # Seed Menu Data

  This migration adds initial menu data for the canteen.
*/

-- Insert categories
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

-- Insert menu items for Tiffins
INSERT INTO menu_items (category_id, name, description, price, calories, available) VALUES
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Idly', 'Soft and fluffy steamed rice cakes', 30, 120, true),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Masala Dosa', 'Crispy rice crepe filled with spiced potato', 60, 250, true),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Plain Dosa', 'Crispy rice crepe', 40, 180, true),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Egg Dosa', 'Dosa with beaten egg spread', 50, 220, true),
  ((SELECT id FROM categories WHERE slug = 'tiffins'), 'Puri', 'Deep-fried bread served with curry', 40, 300, true);

-- Insert menu items for Fast Food
INSERT INTO menu_items (category_id, name, description, price, calories, available) VALUES
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Veg Fried Rice', 'Rice stir-fried with mixed vegetables', 80, 350, true),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Chicken Fried Rice', 'Rice stir-fried with chicken and vegetables', 100, 400, true),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Veg Biryani', 'Aromatic rice dish with vegetables and spices', 120, 450, true),
  ((SELECT id FROM categories WHERE slug = 'fast-food'), 'Chicken Dum Biryani', 'Traditional slow-cooked chicken biryani', 150, 550, true);

-- Insert menu items for Drinks
INSERT INTO menu_items (category_id, name, description, price, calories, available) VALUES
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Maaza', 'Mango flavored drink', 20, 150, true),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Sprite', 'Lemon-lime carbonated drink', 20, 140, true),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Pepsi', 'Cola flavored carbonated drink', 20, 150, true);

-- Insert menu items for Juices
INSERT INTO menu_items (category_id, name, description, price, calories, available) VALUES
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Fresh Orange Juice', 'Freshly squeezed orange juice', 40, 120, true),
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Watermelon Juice', 'Fresh watermelon juice', 35, 100, true),
  ((SELECT id FROM categories WHERE slug = 'juices'), 'Pineapple Juice', 'Fresh pineapple juice', 40, 130, true);

-- Insert menu items for Tea Corner
INSERT INTO menu_items (category_id, name, description, price, calories, available) VALUES
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Masala Chai', 'Indian spiced tea', 15, 100, true),
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Green Tea', 'Healthy green tea', 20, 5, true),
  ((SELECT id FROM categories WHERE slug = 'tea-corner'), 'Coffee', 'Fresh brewed coffee', 20, 100, true);