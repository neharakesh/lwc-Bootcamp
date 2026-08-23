import { LightningElement } from 'lwc';

export default class ShoppingCartParent extends LightningElement {
        cart=[];
        totalItems=0;
        totalAmount=0;
        handleAddToCart(event){

                const product=event.detail;
                this.totalAmount+=product.price;
                this.cart=[...this.cart,product];
                this.totalItems=this.cart.length;
                
                console.log("cart",JSON.stringify(this.cart));
        }
}