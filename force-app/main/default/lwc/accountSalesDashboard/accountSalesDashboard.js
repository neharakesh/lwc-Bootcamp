import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountHandler.getAccounts';
export default class AccountSalesDashboard extends LightningElement {
        accountOptions=[];
        displayError;
        accountId;
        @wire(getAccounts)
        getAllAccounts(result){
                const {data,error}=result;
                console.log(JSON.stringify(data),"data");
                if(data){
                        this.accountOptions=data.map(account=>{
                                return{
                                        label:account.Name,
                                        value:account.Id
                                }
                        })
                }
                if(error){
                        this.displayError=error;
                }
        }
        handleChange(event){
                this.accountId=event.detail.value;
                console.log(this.accountId,"acc id");
        }
}

