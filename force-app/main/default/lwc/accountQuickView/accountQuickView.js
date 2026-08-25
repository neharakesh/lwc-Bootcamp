// myComponent.js
import { LightningElement, api } from "lwc";
export default class MyComponent extends LightningElement {
        viewMode=true;
        @api recordId;
        @api objectApiName;
        fields = ["AnnualRevenue", "Name", "Industry", "Phone", "Type"];

        handleEdit(){
                this.viewMode=false;
        }
}