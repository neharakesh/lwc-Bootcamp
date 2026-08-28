import { LightningElement,api,wire } from 'lwc';
import getOpportunityById from '@salesforce/apex/opportunityHandler.getOpportunityById';
import UpdateStage from '@salesforce/apex/opportunityHandler.UpdateStage';
import { refreshApex } from '@salesforce/apex';
export default class OpportunityChild extends LightningElement {
        opportunityList = [];
        displayError;
        @api accountId;
        opportunityId;
        wiredResult;

        @wire(getOpportunityById,{accountId:'$accountId'})
        getAllopportunity(result){
                this.wiredResult=result;
                const{data,error}=result;
                console.log(this.accountId,"id value")
                if(data){
                        this.opportunityList=data;
                        this.displayError='';
                        console.log(JSON.stringify(data),"data")
                }
                if(error){
                        this.displayError=error;
                        this.opportunityList=undefined;
                }
        }
        
        // handleOnChange(event){
        //         console.log("in");

        //         
        //         
        // }
        handleOnClick(event){
                console.log("on click")
                this.opportunityId=event.target.dataset.id;
                console.log(this.opportunityId,"opp id");
                UpdateStage({oppId:this.opportunityId})
                .then((result)=>{
                        console.log(result,"result");
                        
                        return refreshApex(this.wiredResult);



                })
                .catch((error)=>{
                        console.log("display error",error.body.message);
                })
        }

}