import { LightningElement,api } from 'lwc';

export default class ShoppingCart extends LightningElement {
        data=[
                
  {
    "id": 1,
    "name": "Classic Leather Watch",
    "price": 120.00,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    "id": 2,
    "name": "Wireless Headphones",
    "price": 199.99,
    "category": "Electronics",
    "image": "https://unsplash.com"
  },
  {
    "id": 3,
    "name": "Minimalist Backpack",
    "price": 75.50,
    "category": "Bags",
    "image": "https://unsplash.com"
  },
  {
    "id": 4,
    "name": "Ceramic Coffee Mug",
    "price": 18.00,
    "category": "Home",
    "image": "https://unsplash.com"
  },
  {
    "id": 5,
    "name": "Running Shoes",
    "price": 90.00,
    "category": "Footwear",
    "image": "https://unsplash.com"
  },
  {
    "id": 6,
    "name": "Smart Fitness Tracker",
    "price": 49.99,
    "category": "Electronics",
    "image": "https://unsplash.com"
  },
  {
    "id": 7,
    "name": "Polarized Sunglasses",
    "price": 45.00,
    "category": "Accessories",
    "image": "https://unsplash.com"
  },
  {
    "id": 8,
    "name": "Cotton Baseball Cap",
    "price": 22.50,
    "category": "Apparel",
    "image": "https://unsplash.com"
  },
  {
    "id": 9,
    "name": "Stainless Steel Water Bottle",
    "price": 28.00,
    "category": "Lifestyle",
    "image": "https://unsplash.com"
  },
  {
    "id": 10,
    "name": "Scented Soy Candle",
    "price": 15.00,
    "category": "Home",
    "image": "https://unsplash.com"
  }
]
count;
cart=[];
TotalAmount=0;

handleAddCart(event) {

        let id = Number(event.target.dataset.id);
        let product = this.data.find(item => item.id === id);
        let existingProduct = this.cart.find(item => item.id === id);
        if (existingProduct) {

                existingProduct.quantity += 1;
                 this.TotalAmount+=product.price

        } else {

                this.cart.push({
                ...product,
                quantity: 1
                });

                this.TotalAmount+=product.price

        }
        

        this.cart = [...this.cart];

        console.log(this.cart);
        }
                }

        

