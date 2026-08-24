import { LightningElement, wire } from 'lwc';
import { subscribe,MessageContext } from 'lightning/messageService';
import getCaseById from '@salesforce/apex/casesHandler.getCaseById';
import CASE_BY_ID from '@salesforce/messageChannel/caseMessageChannel__c'
export default class CaseDetails extends LightningElement {
        selectedCase;
        subscription;
        caseError;

        @wire(MessageContext)
        messageContext

        connectedCallback() {
        this.subscribeToMessageChannel();
}

subscribeToMessageChannel(){
        this.subscription=subscribe(this.messageContext,
        CASE_BY_ID,
        (message)=>{
                this.handleMessage(message)
        }
        )
}
handleMessage(message){
        console.log("message recived",message);

        const caseId=message.caseId;
        this.loadCaseDetails(caseId);
}

loadCaseDetails(caseId){
        console.log("inside load case details")
        getCaseById({caseId:caseId})
        .then((result)=>{
                this.selectedCase=result;
                console.log("inside than")
        })
        .catch((error)=>{
                this.caseError=error;
        })
}
        
}