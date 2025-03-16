# Next.js with MongoDB Connectivity

## Overview

This project demonstrates how to connect a Next.js application to MongoDB using Mongoose. It includes a simple API that fetches products from the database and displays them on a frontend page.

## Folder Structure

```
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂fetchProducts
 ┃ ┃ ┃ ┗ 📜route.js  # API route to fetch products from MongoDB
 ┃ ┣ 📂products
 ┃ ┃ ┗ 📜page.js     # Frontend page to display fetched products
 ┃ ┣ 📜globals.css  # Global styles
 ┃ ┣ 📜layout.js    # Layout configuration
 ┃ ┣ 📜page.js      # Main entry page
 ┃ ┗ 📜page.module.css
 ┗ 📂connectivity
 ┃ ┣ 📂schema
 ┃ ┃ ┗ 📜product.js  # Mongoose schema for Product
 ┃ ┗ 📜db.js        # MongoDB connection string
```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <project_folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env.local` file and add the following:
   ```env
   user_name=your_mongodb_username
   password=your_mongodb_password
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## MongoDB Connection (`connectivity/db.js`)

### Purpose

This file is responsible for establishing a connection to MongoDB using credentials stored in environment variables.

### Code Breakdown

```js
const { user_name, password } = process.env; // Extract MongoDB credentials from environment variables
export const connectionSrt =
  "mongodb+srv://" +
  user_name +
  ":" +
  password +
  "@cluster0.65fg2.mongodb.net/next_test?retryWrites=true&w=majority&appName=Cluster0"; // Construct the connection string
```

Ensure your MongoDB credentials are correctly set in the `.env.local` file before running the project.

## Product Schema (`connectivity/schema/product.js`)

### Purpose

A schema defines the structure of the documents stored in a MongoDB collection. Here, we define a schema for storing product information.

### Why Use a Schema?

1. **Enforces Data Structure:** Ensures all documents in a collection follow the same format.
2. **Validation:** Prevents invalid data from being stored in the database.
3. **Middleware Support:** Enables pre-save hooks, transformations, and more.
4. **Better Querying:** Improves consistency and simplifies data retrieval.
5. **Automatic Indexing:** Mongoose can automatically create indexes for better query performance.

### Code Breakdown

```js
import mongoose from "mongoose"; // Import Mongoose to define the schema and model

const productSchema = new mongoose.Schema({
  product: { type: String, required: true }, // Product name must be a string and is required
  price: { type: Number, required: true }, // Price must be a number and is required
  color: { type: String, required: true }, // Color must be a string and is required
  size: { type: Number, required: true }, // Size must be a number and is required
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema); // Create or reuse an existing Product model

export default Product; // Export the Product model for use in API routes
```

### Explanation of Fields

- **`product`**: Stores the name of the product (e.g., "Laptop").
- **`price`**: Holds the numerical value of the product's price.
- **`color`**: Specifies the color of the product.
- **`size`**: Represents the size of the product.

## API Endpoint (`app/api/fetchProducts/route.js`)

### Purpose

This API endpoint connects to MongoDB and retrieves all product data, returning it as a JSON response.

### Code Breakdown

```js
import { connectionSrt } from "@/connectivity/db"; // Import the MongoDB connection string
import Product from "@/connectivity/schema/product"; // Import the Product model
import mongoose from "mongoose"; // Import Mongoose to interact with MongoDB
import { NextResponse } from "next/server"; // Import Next.js response object

export async function GET() {
  mongoose.connect(connectionSrt); // Establish a connection to MongoDB
  const data = await Product.find(); // Retrieve all products from the database
  console.log(data); // Log the retrieved data for debugging
  return NextResponse.json({ dbData: data }); // Return the data as a JSON response
}
```

## Conclusion

This project demonstrates how to set up MongoDB connectivity in a Next.js application. You can extend it further by adding CRUD operations, authentication, and improved error handling.

---
