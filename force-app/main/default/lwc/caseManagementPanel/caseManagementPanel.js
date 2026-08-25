// myComponent.js
import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ORIGIN from '@salesforce/schema/Case.Origin'
import TYPE from '@salesforce/schema/Case.Type'
import STATUS from '@salesforce/schema/Case.Status'
import PRIORITY from '@salesforce/schema/Case.Priority'
import REASON from '@salesforce/schema/Case.Reason'
import SUBJECT from '@salesforce/schema/Case.Subject'
export default class MyComponent extends LightningElement {
        @api recordId;
        createCase=false;
        editData=false;
        ShowData=true;
        
        Origin=ORIGIN;
        Type=TYPE;
        Priority=PRIORITY;
        Reason=REASON;
        Status=STATUS;
        Subject=SUBJECT;

        handleEdit(){
                this.editData=true;
                this.ShowData=false;
                console.log("inside handle edit")
        }
        handleReset(event) {
                const inputFields = this.template.querySelectorAll("lightning-input-field");
                if (inputFields) {
                inputFields.forEach((field) => {
                        field.reset();
                });
                }
        }
        showEditNotification(){
                const event = new ShowToastEvent({
                title: "edited Successfully",
                variant:"success",
                message:
                        "Data edited Successfully",
                });
                this.dispatchEvent(event);
                
        }
        handleCreate(){
                this.createCase=true;
                this.ShowData=false;
                
        }
        
        saveCreatedData(event){
                console.log("inside save create data")
                const CaseNumber=event.detail.fields.CaseNumber.value;
                const evt = new ShowToastEvent({
                title: "Created Successfully",
                variant:"success",
                message:
                        `Case ${CaseNumber} Created Successfully `,
                });
                this.dispatchEvent(evt);
        }
}

