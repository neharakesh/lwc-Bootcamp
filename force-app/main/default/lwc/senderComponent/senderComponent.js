import { LightningElement, wire,api } from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import SAMPLE_MESSAGE from '@salesforce/messageChannel/sampleMessageChannel__c'
export default class SenderComponent extends LightningElement {
        //Practise question-1
        /*


        @api recordId;

        @wire(MessageContext)
        messageContext

        handleOnClick(){
                const message={
                        recordId:this.recordId
                }
                publish(this.messageContext,SAMPLE_MESSAGE,message);
        }
                */


        //Practise question 2

        searchInput;
        @wire(MessageContext)
        messageContext;

        handleOnChange(event){
                this.searchInput=event.target.value;
        }
        handleOnClick(){
                const payload={
                        searchField:this.searchInput
                }
                publish(this.messageContext,SAMPLE_MESSAGE,payload)
        }
}