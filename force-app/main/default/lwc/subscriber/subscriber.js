import { LightningElement ,wire} from 'lwc';
import { subscribe,MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/sampleMessageChannel__c'
export default class Subscriber extends LightningElement {
        Subscriber=null;
        reciveId;

        @wire(MessageContext)
        messageContext

        connectedCallback(){
                if(!this.Subscriber){
                        this.Subscriber=subscribe(this.messageContext,SAMPLE_MESSAGE,(message)=>this.handleMessage(message))
                }
        }
        handleMessage(message){
                this.reciveId=message.recordId;
                console.log("inside handle message in subscriber",this.reciveId);
        }
}