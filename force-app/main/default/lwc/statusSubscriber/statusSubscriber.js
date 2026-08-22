import { LightningElement,wire } from 'lwc';
import { subscribe,MessageContext } from 'lightning/messageService';
import STATUS_CHANNEL from '@salesforce/messageChannel/statusMessageChannel__c'
export default class StatusSubscriber extends LightningElement {
        @wire(MessageContext)
        messageContext

        subscribeToStatusChange(){
                subscribe(this.messageContext,STATUS_CHANNEL,(payload)=>this.handleStatus(payload));
        }
        handleStatus(payload){
                console.log(payload.status)
        }
}