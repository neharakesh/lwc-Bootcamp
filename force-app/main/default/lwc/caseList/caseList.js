import { LightningElement, wire } from 'lwc';
import getCaseList from '@salesforce/apex/casesHandler.getCaseList';
import CASE_LIST from '@salesforce/messageChannel/caseMessageChannel__c'
import { publish,MessageContext } from 'lightning/messageService';
export default class CaseList extends LightningElement {
        caseList;
        caseError;

        @wire(MessageContext)
        messageContext
        @wire(getCaseList)
        getAllCase(result){
                const {data,error}=result;
                if(data){
                        this.caseList=data;
                        this.caseError='';
                }
                if(error){
                        this.caseError=error;
                        this.caseList=undefined;
                }
        }

        caseId;
        handleOnClick(event){
                console.log("inside handle on click method")
                this.caseId=event.currentTarget.dataset.id;
                console.log(this.caseId,"caseId");

                const message={
                        caseId:this.caseId
                }
                publish(this.messageContext,CASE_LIST,message);
        }
}