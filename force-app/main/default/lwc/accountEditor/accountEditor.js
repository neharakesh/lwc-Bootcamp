import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class AccountEditor extends LightningElement {
        @api recordId;

        fields=['Name','Phone','Website','Industry','Type']
        handleSuccess(){
                console.log("succesfully kuch to hua hai")
        }
        handleNotification(){
                
                const event = new ShowToastEvent({
                title: "Updated",
                variant:"success",
                message:
                        "Your data is edited succesfully",
                });
                
                this.dispatchEvent(event);
                
        }
        handleReset(){
                console.log("inside reset")
                const freshData=this.template.querySelectorAll('lightning-input-field')

                if(freshData){
                        freshData.forEach((value)=>{
                                value.reset();
                        })
                }
        }
}