import { LightningElement, wire } from 'lwc';
import getAccountRecord from '@salesforce/apex/accountHandler.getAccountRecord';
export default class AccountByName extends LightningElement {
        accountList;
        accountError;

        @wire(getAccountRecord,{accountName:'001fj00001bC9kwAAC'})
        accountRecord(result){
                const {data,error}=result;
                if(data){
                        this.accountList=data;
                        this.accountError='';
                }
                if(error){
                        this.accountError=error
                        this.accountList=undefined
                }
        }

        
}