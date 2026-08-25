import { LightningElement ,api,wire} from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import STATUS_CHANNEL from '@salesforce/messageChannel/statusMessageChannel__c';
import getCaseById from '@salesforce/apex/casesHandler.getCaseById';
import updateCaseStatus from '@salesforce/apex/casesHandler.updateCaseStatus';
export default class CaseStatusUpdater extends LightningElement {
        @api recordId;
        caseData;
        caseError;

        @wire(MessageContext)
        messageContext;


        @wire(getCaseById, { caseId: '$recordId' })
        wiredCase({ data, error }) {
                if(data) {
                this.caseData = data;
                this.error = undefined;
                } 
                if(error) {
                this.error = error;
                this.caseData = undefined;
        }
        }
        handleResolve(){
                updateCaseStatus({caseId:this.recordId})
                .then((result)=>{
                        this.caseData=result
                        const message={
                                caseId:result.Id,
                                caseNumber:result.CaseNumber,
                                status:result.Status
                        }

                        publish(this.messageContext,STATUS_CHANNEL,message)
                })
                .catch((error)=>{
                        this.caseError=error;
                        this.caseData=undefined;
                })
        }

}