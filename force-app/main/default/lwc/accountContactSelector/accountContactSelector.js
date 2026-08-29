import { api, LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountHandler.getAccounts';
import getContactsById from '@salesforce/apex/contactController.getContactsById'
export default class AccountContactSelector extends LightningElement {
        accountList;
        displayAccountError;
        @api accountId;

        contactList;
        contactError;
        @api contactId;

        showContacts=false;

        @wire(getAccounts)
        getAllAccounts(result){
                const {data,error}=result;
                this.showContacts=true;
                if(data){
                        this.accountList=data.map(account=>{
                                return {
                                        label:account.Name,
                                        value:account.Id
                                }
                        })
                }
                if(error){
                        this.accountList=undefined;
                        this.displayAccountError=error;
                }
        }
        handleAccountChange(event){
                this.accountId=event.detail.value;
                console.log("account id recived",this.accountId)
        }



        @wire(getContactsById,{accId:'$accountId'})
        getAllContacts(result){
                const {data,error}=result;
                if(data){
                        this.contactList=data.map((contact)=>{
                                return{
                                        label:contact.Name,
                                        value:contact.Id
                                }
                        })
                }
                if(error){
                        this.contactList=undefined;
                        this.contactError=error;
                }
        }
        handleContactChange(event){
                this.contactId=event.detail.value;
                console.log("contact Id",this.contactId)
        }
}