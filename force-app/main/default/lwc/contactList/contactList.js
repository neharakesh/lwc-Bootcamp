import { LightningElement,api,wire } from 'lwc';
import getContactsById from '@salesforce/apex/contactController.getContactsById';
import {refreshApex} from '@salesforce/apex'
export default class ContactList extends LightningElement {
        @api accountId;
        ListOfConctact;
        contactError;
        wiredResult;
        
        @wire(getContactsById,{accId:'$accountId'})
        getAllContacts(result){
                this.wiredResult=result;
                const{data,error}=result;
                console.log(this.accountId)
                console.log(JSON.stringify(result),"show result")
                console.log("enetrd in wired contact list method")
                if(data){
                        this.ListOfConctact=data;
                        this.contactError='';
                        console.log(JSON.stringify(data),"show data")
                }
                if(error){
                        this.contactError=error.body.message;
                        this.ListOfConctact=undefined;
                }
        }


        @api refreshData(){
                return refreshApex(this.wiredResult);
        }
}

