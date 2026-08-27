import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts'
import updateContacts from '@salesforce/apex/contactController.updateContacts';
import {refreshApex} from '@salesforce/apex'
export default class ContactDirectory extends LightningElement {
        
        contactList;
        displayError;
        isloading=true;
        wiredResult=[];
        columns=[
                {
                        label:"id",
                        fieldName:"Id"
                },
                {
                        label:"Name",
                        fieldName:"Name"
                },
                {
                        label:"Do not Call",
                        fieldName:"Do_not_Contact__c",
                        
                }

                
        ]
        @wire(getContacts)
        allContacts(result){
                this.wiredResult=result
                console.log("inside wire")
                const {data,error}=result
                if(data){
                        this.contactList=data;
                        this.displayError='';
                        this.isloading=false;
                }
                console.log("data",this.contactList)
                if(error){
                        this.displayError=error;
                        this.contactList=undefined;
                        this.isloading=false;
                }
        }
        selectedContactIds=[];
        isDisabled=true;
        handleRowSelection(event){
                this.selectedContactIds=event.detail.selectedRows.map(row=>row.Id)
                if(this.selectedContactIds.length>0){
                        this.isDisabled=false;
                }
        }
        handleOnClick(){
                console.log("inside handle on click")
                updateContacts({slectedContact:this.selectedContactIds})
                .then((result)=>{
                        console.log(result,"result");

                        if(result){
                                this.isDisabled=true;
                                return refreshApex(this.wiredResult);
                        }
                })
                .then((result)=>{
                        this.selectedContactIds=[];
                })
                .catch((error)=>{
                        console.log(error.body.message,"got an error");
                })
        }


}