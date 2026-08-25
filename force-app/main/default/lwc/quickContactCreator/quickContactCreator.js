import { api, LightningElement } from 'lwc';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName'
import Last_NAME from '@salesforce/schema/Contact.LastName'
import PHONE from '@salesforce/schema/Contact.Phone'
import EMAIL from '@salesforce/schema/Contact.Email'
import TITLE from '@salesforce/schema/Contact.Title'
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class QuickContactCreator extends LightningElement {
        @api recordId;
        
        firstName=FIRST_NAME;
        LastName=Last_NAME;
        Phone=PHONE;
        Email=EMAIL;
        Title=TITLE;
        handleContactCreated(){
                console.log("inside handle contact")
        }
        showNotification(){
                const event = new ShowToastEvent({
                title: "Get Help",
                variant:"success",
                message:
                        "Contact Has been created successfully.",
                });
                this.dispatchEvent(event);
        }
        resetData(event){
                const oldData=this.template.querySelectorAll('lightning-input-field')
                console.log("inside reset Data")
                if(oldData){
                        oldData.forEach((value)=>{
                                if(value.fieldName !== 'AccountId'){
                                        value.reset();
                                }
                                
                        })
                }
        }
}

