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

```js
const { user_name, password } = process.env;
export const connectionSrt =
  "mongodb+srv://" +
  user_name +
  ":" +
  password +
  "@cluster0.65fg2.mongodb.net/next_test?retryWrites=true&w=majority&appName=Cluster0";
```

### Where to Get the MongoDB Connection String?

To get your MongoDB connection string, follow these steps:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and log igate to your cluster and click **Connect**.
2. Select **Connect your application**.
3. Copy the provided connection string.
4. Replace `<username>` and `<password>` with your actual credentials in the `.env.local` file.

Ensure your MongoDB credentials are correctly set in the `.env.local` file.

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

## Fetching and Displaying Products (`app/products/page.js`)

### Purpose

This component fetches product data from the API and displays it on the frontend.

### Code Breakdown

```js
const page = async () => {
  async function fetchApi() {
    let product = await fetch("http://localhost:3001/api/fetchProducts", {
      method: "GET",
    });
    product = await product.json();
    product = product.dbData;
    console.log(product);

    console.log(typeof product);

    return product;
  }
  const data = await fetchApi();

  return (
    <div>
      {data.map((pro) => (
        <>
          <h1>{pro.item}</h1> {/* Incorrect: should be 'pro.product' */}
          <h1>{pro.price}</h1>
        </>
      ))}
    </div>
  );
};

export default page;
```

### Explanation

- **`fetchApi` Function**: Fetches product data from the backend API.
- **`await fetch()`**: Sends a GET request to retrieve data from `fetchProducts` API.
- **`.json()`**: Converts the API response to JSON.
- **`product.dbData`**: Extracts the actual product data from the response.
- **`console.log(typeof product)`**: Logs the data type for debugging.
- **`.map((pro) => ( ... ))`**: Iterates over the fetched products and displays them.

### Issue Fix

- The code references `pro.item`, but in our schema, the correct field is `pro.product`. The corrected code should be:
  ```js
  <h1>{pro.product}</h1>
  ```

## Conclusion

This project demonstrates how to set up MongoDB connectivity in a Next.js application. You can extend it further by adding CRUD operations, authentication, and improved error handling.

---

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

The `db.js` file constructs the MongoDB connection string using environment variables:

```js
const { user_name, password } = process.env;
export const connectionSrt =
  "mongodb+srv://" +
  user_name +
  ":" +
  password +
  "@cluster0.65fg2.mongodb.net/next_test?retryWrites=true&w=majority&appName=Cluster0";
```

### Where to Get the MongoDB Connection String?

To get your MongoDB connection string, follow these steps:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and log igate to your cluster and click **Connect**.
2. Select **Connect your application**.
3. Copy the provided connection string.
4. Replace `<username>` and `<password>` with your actual credentials in the `.env.local` file.

Ensure your MongoDB credentials are correctly set in the `.env.local` file.

## Product Schema (`connectivity/schema/product.js`)

### What is a Schema?

A schema in MongoDB (using Mongoose) defines the structure of documents in a collection. It enforces rules for the data stored, ensuring consistency.

### Why Use a Schema?

- Ensures data integrity by defining required fields.
- Provides structure and validation.
- Allows efficient querying using Mongoose methods.

### Product Schema Code Breakdown

```js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: Number, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
```

## API Endpoint (`app/api/fetchProducts/route.js`)

Fetches product data from MongoDB:

```js
import { connectionSrt } from "@/connectivity/db";
import Product from "@/connectivity/schema/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  mongoose.connect(connectionSrt);
  const data = await Product.find();
  console.log(data);
  return NextResponse.json({ name: "anil", dbData: data });
}
```

## Fetching Data in Frontend (`app/products/page.js`)

This page fetches and displays products from the API:

### Code Breakdown

```js
const page = async () => {
  async function fetchApi() {
    let product = await fetch("http://localhost:3001/api/fetchProducts", {
      method: "GET",
    });
    product = await product.json();
    product = product.dbData;
    console.log(product);
    return product;
  }
  const data = await fetchApi();
  return (
    <div>
      {data.map((pro) => (
        <>
          <h1>{pro.item}</h1> // Incorrect field name, should be 'product'
          <h1>{pro.price}</h1>
        </>
      ))}
    </div>
  );
};
export default page;
```

### Explanation:

1. **fetchApi()**: Fetches product data from the backend API.
2. **Await Fetch Response**: The API request is sent, and the response is parsed as JSON.
3. **Mapping Data**: The `map()` function iterates over the fetched product list and displays its details.
4. **Incorrect Field Reference**: `pro.item` should be `pro.product` based on the schema.

## Issues and Fixes

- **Incorrect Property Name in \*\*\*\*\*\***`products/page.js`\*\*:
  ```js
  <h1>{pro.item}</h1> // 'item' should be 'product'
  ```
  **Fix:** Update it to match the schema:
  ```js
  <h1>{pro.product}</h1>
  ```

## Conclusion

This project demonstrates how to set up MongoDB connectivity in a Next.js application. You can extend it further by adding CRUD operations, authentication, and improved error handling.

---

If you have any issues, feel free to raise them in the repository!
