import { LightningElement,wire } from 'lwc';
import getOpportunityById from '@salesforce/apex/opportunityHandler.getOpportunityById';
import { subscribe,MessageContext } from 'lightning/messageService';
import STATUS_CHANNEL from '@salesforce/messageChannel/statusMessageChannel__c';
export default class OpportunityDetails extends LightningElement {
        subscription;
        selectedOpportunity;
        opportunityError;

        @wire(MessageContext)
        messageContext

        connectedCallback(){
                this.subscribeTOMessageChannel();
        }
        subscribeTOMessageChannel(){
                this.subscription=subscribe(this.messageContext,STATUS_CHANNEL,
                        (message)=>{this.handlesubscribe(message)}
                )
        }
        handlesubscribe(message){
                console.log("message recived");
                const oppId=message.oppId;
                console.log(oppId,"oppId inside handle subscribe");
                this.loadDetails(oppId);
        }

        loadDetails(oppId){
                getOpportunityById({oppId})
                .then((result)=>{
                        this.selectedOpportunity=result[0]
                        this.opportunityError=''
                })
                .catch((error)=>{
                        this.selectedOpportunity=undefined;
                        this.opportunityError=error;
                })
        }

}