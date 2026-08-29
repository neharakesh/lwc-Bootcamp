import { api, LightningElement, wire } from 'lwc';
import getCaseByAccountId from '@salesforce/apex/casesHandler.getCaseByAccountId';
import Priority from '@salesforce/schema/Case.Priority';

export default class CaseListChild extends LightningElement {
        @api accountId;
        @api status;
        @api priority;
        caseList;
        displayError;
        columns=[
                {
                        label:"id",
                        fieldName:'Id'
                },

                {
                        label:"CaseNumber",
                        fieldName:'CaseNumber'
                },
                {
                        label:"Status",
                        fieldName:'Status'
                },
                {
                        label:"priority",
                        fieldName:'Priority'
                }
        ]


        @wire(getCaseByAccountId,{accountId:'$accountId',Status:'$status',Priority:'$priority'})
        getAllCase(result){
                console.log("inside wire")
                console.log(JSON.stringify(result.data));
                const {data,error}=result;
                if(data){
                        this.caseList=data;
                        this.displayError='';
                        console.log(JSON.stringify(this.caseList));
                        console.log(JSON.stringify(data));
                }
                if(error){
                        this.displayError=error;
                        this.caseList=undefined;
                }
        }
}