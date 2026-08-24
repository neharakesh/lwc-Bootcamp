import { LightningElement, wire } from 'lwc';
import getOpportunity from '@salesforce/apex/opportunityHandler.getOpportunity';
import { publish,MessageContext } from 'lightning/messageService';
import STATUS_CHANNEL from '@salesforce/messageChannel/statusMessageChannel__c';
export default class OpportunityList extends LightningElement {
        opportunityList;
        opportunityError;

        @wire(MessageContext)
        messageContext

        @wire(getOpportunity)
        getAllOpportunity(result){
                const {data,error}=result;
                if(data){
                        console.log("somethng")
                        this.opportunityList=data;
                        this.opportunityError='';
                }
                if(error){
                        this.opportunityError=error;
                        this.opportunityList=undefined;
                }
        }

        oppId;
        oppName;
        handleOnClick(event){
                this.oppId=event.currentTarget.dataset.id;
                const selectedName=this.opportunityList.find((value)=>{
                        return  value.Id===this.oppId;
                })
                console.log(this.oppId,"oppId");

                const message={
                        oppId:this.oppId,
                        oppName:selectedName
                }
                publish(this.messageContext,STATUS_CHANNEL,message)
        }
}