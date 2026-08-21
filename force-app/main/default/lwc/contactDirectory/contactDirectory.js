import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts'
export default class ContactDirectory extends LightningElement {
        contactList;
        displayError;
        isloading=true;
        columns=[
                {
                        label:"id",
                        fieldName:"Id"
                },
                {
                        label:"Name",
                        fieldName:"Name"
                }
        ]
        @wire(getContacts)
        allContacts({data,error}){
                console.log("inside wire")
                if(data){
                        this.contactList=data;
                        this.displayError='';
                        this.isloading=false;
                }
                console.log("data",this.contactList)
                if(error){
                        this.displayError=error;
                        this.contactList=undefined;
                        isloading=false;
                }
        }
}