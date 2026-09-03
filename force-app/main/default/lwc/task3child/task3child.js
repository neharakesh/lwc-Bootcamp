import { api, LightningElement, wire } from 'lwc';
import getSelectedOffer from '@salesforce/apex/task3handler.getSelectedOffer'
export default class Task3child extends LightningElement {
        @api selectedlistid;
        selectedList;
        selectedError;
        columns=[
                {
                        label:'Property3__c',
                        fieldName:'Property3__c',
                },
                {
                        label:'Offer_Amount__c',
                        fieldName:'Offer_Amount__c',
                },
                
                {
                        label:'Status',
                        fieldName:'Status__c',
                }

        ]

        @wire(getSelectedOffer)
        getAllSelectedOffer(result){
                console.log("inside child wire");
                const {data,error}=result;
                if(data){
                        this.selectedList=data;
                        this.selectedError=error;
                }
                if(error){
                        this.selectedError=error;
                }
        }
}