import { LightningElement ,api,wire} from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import CASE_NUMBER from '@salesforce/schema/Case.CaseNumber'
import STATUS from '@salesforce/schema/Case.Status'
import SUBJECT from '@salesforce/schema/Case.Subject'
import STATUS_CHANNEL from '@salesforce/messageChannel/statusMessageChannel__c';
import { getFieldValue } from 'lightning/uiRecordApi';

const FIELDS=[CASE_NUMBER,STATUS,SUBJECT]
export default class CaseStatusUpdater extends LightningElement {
        //method-1
        // @api recordId;
        // caseData;
        // caseError;

        // @wire(MessageContext)
        // messageContext;


        // @wire(getCaseById, { caseId: '$recordId' })
        // wiredCase({ data, error }) {
        //         if(data) {
        //         this.caseData = data;
        //         this.error = undefined;
        //         } 
        //         if(error) {
        //         this.error = error;
        //         this.caseData = undefined;
        // }
        // }
        // handleResolve(){
        //         updateCaseStatus({caseId:this.recordId})
        //         .then((result)=>{
        //                 this.caseData=result
        //                 const message={
        //                         caseId:result.Id,
        //                         caseNumber:result.CaseNumber,
        //                         status:result.Status
        //                 }

        //                 publish(this.messageContext,STATUS_CHANNEL,message)
        //         })
        //         .catch((error)=>{
        //                 this.caseError=error;
        //                 this.caseData=undefined;
        //         })
        // }


        //Method-2

        

        @api recordId;
        @wire(MessageContext)
        messageContext

        @wire(getRecord,{recordId:'$recordId',fields:FIELDS})
        caseRecord


        //getters
        get caseNumber(){
                return getFieldValue(this.caseRecord.data,CASE_NUMBER)
        }
        get status(){
                return getFieldValue(this.caseRecord.data,STATUS)
        }
        get subject(){
                return getFieldValue(this.caseRecord.data,SUBJECT)
        }


        handleOnClick(){
                const inputvalue=[
                        
                ]
                const payload={
                        caseNumber:CASE_NUMBER,
                        status:STATUS,
                        subject:SUBJECT
                }
        }

}