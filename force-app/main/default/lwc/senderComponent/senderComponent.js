import { LightningElement, wire,api } from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/sampleMessageChannel__c'
export default class SenderComponent extends LightningElement {
        @api recordId;

        @wire(MessageContext)
        messageContext

        handleOnClick(){
                const message={
                        recordId:this.recordId
                }
                publish(this.messageContext,SAMPLE_MESSAGE,message);
        }
}