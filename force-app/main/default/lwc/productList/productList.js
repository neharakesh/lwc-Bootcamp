import { LightningElement ,api} from 'lwc';

export default class ProductList extends LightningElement {
        @api productList=[
        {
                "id": 1,
                "productName": "Laptop",
                "price": 75000
        },
        {
                "id": 2,
                "productName": "Smartphone",
                "price": 45000
        },
        {
                "id": 3,
                "productName": "Wireless Headphones",
                "price": 5000
        },
        {
                "id": 4,
                "productName": "Smart Watch",
                "price": 8000
        },
        {
                "id": 5,
                "productName": "Tablet",
                "price": 30000
        },
        {
                "id": 6,
                "productName": "Bluetooth Speaker",
                "price": 3500
        },
        {
                "id": 7,
                "productName": "Keyboard",
                "price": 2500
        },
        {
                "id": 8,
                "productName": "Mouse",
                "price": 1500
        }
]

        @api handleAddToCart(event){
                
                const productId=event.currentTarget.dataset.id;
                console.log(productId,"productId");
                const selectedProduct=this.productList.find(product=>product.id==productId);
                
                console.log('SELECTED PRODUCT:', JSON.stringify(selectedProduct));
                
                this.dispatchEvent(
                        new CustomEvent('addtocart',{detail:selectedProduct})
                )
        }
}