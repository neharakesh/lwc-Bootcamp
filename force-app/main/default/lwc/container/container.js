import { api } from "lwc";
import { LightningElement} from 'lwc';

export default class Container extends LightningElement {
        @api productsFound=false
        @api productList;
        @api productRating;
        @api changeData;
        @api textField;
        // @api count;
        // displayitems
        // if(count){
        //         this.displayitems=true;
        // }
        get hasProduct(){
                return this.productsFound=="true"?true:false
        }

        @api handleContainerVar=false;

        //making a method whic i will call in owner component
        @api handleContainer(){
                this.handleContainerVar=true;
        }
}