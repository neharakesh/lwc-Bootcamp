import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountHandler.getAccounts'
import getContactsByAccountId from '@salesforce/apex/accountHandler.getContactsByAccountId'
export default class AccountContactBrowser extends LightningElement {
        accountList;
        displayError;
        
        @wire(getAccounts)
        getAllAccount({data,error}){
                console.log("inside wire in accounbrow")
                if(data){
                        console.log(JSON.stringify(data))
                        this.accountList=data;
                        this.displayError='';
                        console.log(JSON.stringify(this.accountList),"data print kro")
                }
                if(error){
                        this.accountList=undefined;
                        this.displayError=error;
                }
        
        }
        accountid;
        handleAccountId(event){
                this.accountid=event.currentTarget.dataset.id;
                console.log(this.accountid,"accountId")

        }
        ListContacts;
        @wire(getContactsByAccountId,{accountId:'$accountid'})
        getAllContactsById({data,error}){
                console.log("inside 2nd wire method")
                if(data){
                        this.ListContacts=data;
                        this.displayError=''
                        console.log("data")
                        console.log(JSON.stringify(this.ListContacts),"List Of contacts")
                }
                if(error){
                        this.ListContacts=undefined;
                        this.displayError=error;
                        console.log("error")
                }
        }
}