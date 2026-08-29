import { LightningElement,api, wire } from 'lwc';
import getCaseList from '@salesforce/apex/casesHandler.getCaseList'
export default class LwcToFlowPractise extends LightningElement {

        // //Question -1
        // @api accountName;
        // displayFlow=false;

        // handleOnClick(){
        //         this.displayFlow=!this.displayFlow;
        //         console.log(this.displayFlow);
        //         console.log(this.accountName);
        // }
        // handleFlowStatus(event){
        //         if(event.detail.status==="FINISHED"){

                
        //         const outputVariables=event.detail.outputVariables;
        //         outputVariables.forEach(variable=>{
        //                 if(variable.name==='accountName'){
        //                         this.accountName=variable.value;
        //                 }
        //         })
        
        // }
        // }

        //Question-2
        caseList;
        displayError;
        launchFlow=false;
        lastDisplay;
        inputVariables=[];
        
        


        @wire(getCaseList)
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
        handleEsclateButton(event){
                this.launchFlow=true;
                console.log("inside button");
                console.log(this.launchFlow,"launch Flow1");
                const selectedId=event.currentTarget.dataset.id;
                this.inputVariables=[
                                {
                                        name:"caseId",
                                        value:selectedId,
                                        type:'String'
                                }
                        ]
                console.log(this.launchFlow,"launch Flow");
                console.log(JSON.stringify(this.inputVariables),"caseId")
        }
        handleStatusChange(event){
                        if (event.detail.status === "FINISHED"){
                                const outputVariables = event.detail.outputVariables;
                                console.log("inside handleStatusChange");
                                this.lastDisplay="Sucessfully updated."
                        }
                
        }
        
}
