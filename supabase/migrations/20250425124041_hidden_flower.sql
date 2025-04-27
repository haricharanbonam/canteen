/*
  # Menu System Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    
    - `menu_items`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `calories` (integer)
      - `available` (boolean)
      - `created_at` (timestamp)
    
    - `ratings`
      - `id` (uuid, primary key)
      - `menu_item_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text,
  calories integer,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create ratings table
CREATE TABLE ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(menu_item_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Menu items policies
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT
  TO public
  USING (true);

-- Ratings policies
CREATE POLICY "Ratings are viewable by everyone"
  ON ratings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
  ON ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
  ON ratings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);