import { LightningElement,api, wire } from 'lwc';
import getCaseListByAccountId from '@salesforce/apex/casesHandler.getCaseListByAccountId'
export default class Account360 extends LightningElement {
        @api recordId;

        fields = ["AccountId", "Name", "Industry","AnnualRevenue"];
        
        caseList;
        displayError;
        launchFlow=false;
        lastDisplay;
        inputVariables=[];
                
                
        
        
                @wire(getCaseListByAccountId,{accountId:'$recordId'})
                getAllCases(result){
                        const{data,error}=result;
                        if(data){
                                this.caseList=data;
                                this.error=''
                                
        
                        }
                        if(error){
                                this.caseList=undefined;
                                this.displayError=error;
                        }
                }
        
        handleOnClick(event){
                
                this.inputVariables=[
                                {
                                        name:"accountId",
                                        type:"String",
                                        value:this.recordId

                                }
                        ]
                this.launchFlow=true;
                console.log(this.launchFlow,"launchFlow");

        }
        handleStatusChange(event){
                
                if(event.detail.status==="FINISHED"){
                        const outputVariables=event.detail.outputVariables;
                        console.log("inside flow");
                        
                }
                
        }
}
