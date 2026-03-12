# OPSHUB - Product Manager

A React application for managing products with detailed specifications. This app runs on GitHub Pages and allows you to create, read, update, and delete product information.

## Features

- ✅ Add new products with complete specifications
- ✅ View all products in a sortable table
- ✅ Edit existing product information
- ✅ Delete products
- ✅ Local storage persistence (data saves automatically)
- ✅ Responsive design (works on desktop and mobile)
- ✅ Form validation

## Product Fields

Each product includes the following information:

- **Product Name**: The name of the product
- **Part Number**: Unique identifier for the part
- **Product Family**: Category or family the product belongs to
- **Customer**: Customer associated with the product
- **Turnaround Time**: Expected turnaround time for orders
- **Overhaul Time**: Time required for product overhaul

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building

Create an optimized production build:

```bash
npm run build
```

### Deployment to GitHub Pages

First, update the `homepage` field in `package.json`:

```json
"homepage": "https://yourusername.github.io/OPSHUB"
```

Then deploy:

```bash
npm run deploy
```

## How to Use

1. **Add a Product**: Fill out the form with all required fields and click "Add Product"
2. **View Products**: All added products appear in the table below the form
3. **Edit a Product**: Click the "Edit" button next to a product, modify the fields, and click "Save"
4. **Delete a Product**: Click the "Delete" button to remove a product

## Data Storage

All product data is stored in Supabase with Row-Level Security (RLS) enforcement. Data is retrieved and persisted to the database through API calls.

## Live Application

The app is deployed to GitHub Pages at:
**https://Dlimb4876.github.io/OPSHUB/**

Make sure to use the full URL with trailing slash for proper routing.

## Technologies Used

- **React 18**: UI library with React Router v7 for client-side routing
- **React Router**: Client-side navigation with basename support for GitHub Pages subdirectory
- **React Scripts**: Build and development tools
- **Supabase**: Backend database with RLS authentication
- **CSS3**: Styling with responsive design

## License

This project is part of OPSHUB operations hub.