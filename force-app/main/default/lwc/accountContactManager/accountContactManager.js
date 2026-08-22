import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountHandler.getAccounts';
export default class AccountContactManager extends LightningElement {
        accountList;
        accountError;
        
        @wire(getAccounts)
        getAllAccounts(result){
                const{data,error}=result;
                if(data){
                        this.accountList=data;
                        this.accountError='';
                }
                if(error){
                        this.accountError=error.body.message;
                        this.accountList=undefined;
                }
        }

        accountId;
        handleContact(event){
                this.accountId=event.currentTarget.dataset.id;
                console.log(this.accountId,"account Id");
        }

        
}