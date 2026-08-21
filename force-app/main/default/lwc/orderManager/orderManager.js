import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountHandler.getAccounts';
import getProducts from '@salesforce/apex/productController.getProducts'
import TotalAmount from '@salesforce/schema/Order.TotalAmount';
export default class OrderManager extends LightningElement {
        //get all accounts
        accountList
        accountError
        @wire(getAccounts)
        getAllAccounts(result){
                const {data,error}=result
                if(data){
                        this.accountList=data;
                        this.accountError='';
                }
                if(error){
                        this.accountError=error
                        this.accountList=[]
                }
        }
        //get all products
        productList;
        productError;
        @wire(getProducts)
        getAllProducts(result){
                const {data,error}=result
                if(data){
                        this.productList=data;
                        this.productError='';
                }
                if(error){
                        this.productError=error
                        this.productList=[]
                }
        }

        //add to cart
        cart=[];
        productId;
        quantity;
        handleAddToCart(event){
                console.log("inside handleadd to cart")
                this.productId=event.currentTarget.dataset.id;
                console.log(this.productId,"product Id");
                const product=this.productList.find(item =>item.Id===this.productId)
                const existingProduct=this.cart.find(item =>item.Id===this.productId)
                if (!product) {
                        console.log('Product not found');
                        return;
                }
                if(existingProduct){
                        existingProduct.quantity+=1;
                
                        console.log("item exist" ,existingProduct.quantity)
                }
                else{
                        this.cart.push({...product,quantity:1});
                }
                this.cart=[...this.cart];
                console.log("end")
        }

}