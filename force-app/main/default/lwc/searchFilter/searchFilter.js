import { LightningElement } from 'lwc';

export default class SearchFilter extends LightningElement {
        data=[
        {
        "name": "Wireless Mouse",
        "category": "Electronics",
        "price": 25.99
        },
        {
        "name": "Bluetooth Speaker",
        "category": "Electronics",
        "price": 45.50
        },
        {
        "name": "Ergonomic Office Chair",
        "category": "Furniture",
        "price": 189.00
        },
        {
        "name": "Stainless Steel Water Bottle",
        "category": "Kitchen",
        "price": 15.75
        },
        {
        "name": "Running Shoes",
        "category": "Footwear",
        "price": 79.99
        },
        {
        "name": "Cotton Crewneck T-Shirt",
        "category": "Apparel",
        "price": 19.99
        },
        {
        "name": "Ceramic Coffee Mug",
        "category": "Kitchen",
        "price": 12.50
        },
        {
        "name": "Yoga Mat",
        "category": "Fitness",
        "price": 29.00
        },
        {
        "name": "LED Desk Lamp",
        "category": "Home Decor",
        "price": 34.25
        },
        {
        "name": "Leather Wallet",
        "category": "Accessories",
        "price": 49.99
        },
        {
        "name": "Mechanical Keyboard",
        "category": "Electronics",
        "price": 99.00
        },
        {
        "name": "Canvas Backpack",
        "category": "Accessories",
        "price": 55.00
        },
        {
        "name": "Non-Stick Frying Pan",
        "category": "Kitchen",
        "price": 38.40
        },
        {
        "name": "Dumbbell Set",
        "category": "Fitness",
        "price": 65.00
        },
        {
        "name": "Sunglasses",
        "category": "Accessories",
        "price": 24.50
        }
        ]
        searchVal;
        result=this.data;
        handleSearch(event){
                this.searchVal=event.target.value;
                this.result=this.data.filter((item)=>{
                        return item.name.toLowerCase().includes(this.searchVal.toLowerCase())
                
                
        })

        }
}