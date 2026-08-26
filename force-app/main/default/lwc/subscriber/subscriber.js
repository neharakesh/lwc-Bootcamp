import { LightningElement ,wire} from 'lwc';
import { subscribe,MessageContext, unsubscribe } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/sampleMessageChannel__c'
export default class Subscriber extends LightningElement {
        //practise question -1
        // Subscriber=null;
        // reciveId;

        // @wire(MessageContext)
        // messageContext

        // connectedCallback(){
        //         if(!this.Subscriber){
        //                 this.Subscriber=subscribe(this.messageContext,SAMPLE_MESSAGE,(message)=>this.handleMessage(message))
        //         }
        // }
        // handleMessage(message){
        //         this.reciveId=message.recordId;
        //         console.log("inside handle message in subscriber",this.reciveId);
        // }


        //practise question -2

        subscriber;
        searchOutput;
        @wire(MessageContext)
        messageContext

        connectedCallback(){
                if(!this.subscriber){
                        this.subscriber=subscribe(this.messageContext,SAMPLE_MESSAGE,(message)=>this.handleMessage(message));
                }
        }
        disconnectedCallback(){
                this.handleDisconnection();
        }
        handleMessage(message){
                this.searchOutput=message.searchField
                console.log("inside message handler ",this.searchOutput);
        }
        handleDisconnection(){
                unsubscribe(this.searchOutput)
        }

}