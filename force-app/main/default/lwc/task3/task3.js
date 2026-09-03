import { api, LightningElement, wire } from 'lwc';
import getProperty from '@salesforce/apex/task3handler.getProperty'
import updatemergedRecord from '@salesforce/apex/task3handler.updatemergedRecord'
export default class Task3 extends LightningElement {
        @api getId;
        propertyList;
        propertyError;
        columns=[
                
                {
                        label:'Property3__c',
                        fieldName:'Property3__c',
                },
                {
                        label:'Offer_Amount__c',
                        fieldName:'Offer_Amount__c',
                },
                
                {
                        label:'Status',
                        fieldName:'Status__c',
                }

        ]

        @wire(getProperty,{getId:'$getId'})
        getAllProperty(result){
                console.log("inside wire");
                if(result.data){
                        console.log("data");
                        console.log(JSON.stringify(result.data),"data");
                        this.propertyList=result.data;
                        
                }
                if(result.error){
                        this.propertyError=result.error;
                        console.log("error");
                }
        }
        showMessage;
        childComponent=false;
        selectIdList=[];
        handleRowSelection(event){
                console.log("inside handle row selection")
                const selectedRow=event.detail.selectedRows;
                this.selectIdList=selectedRow;
                console.log(JSON.stringify(this.selectIdList),"selected list")

        }

        
        handleProceedMerge(){
                console.log("inside handle proceed merge1")
                if (this.selectIdList.length !== 2) {
                        this.showMessage = "Please select exactly 2 rows.";
                        return;
                }
                if(this.selectIdList[0].Buyer__c==this.selectIdList[1].Buyer__c){
                        this.childComponent=true;
                        console.log("inside handle proceed merge", this.childComponent);
                }
                
                else{
                        this.showMessage="please selct rows";
                }
        }

        primaryRecord;
        primaryRecordId;
        secondaryRecord;
        secondaryRecordId;
        handleprimary(event){
                console.log("inside handle primary");
                
                const selectedrow=event.detail.selectedRows
                this.primaryRecord=selectedrow[0];
                this.primaryRecordId=this.primaryRecord.Id;
                console.log("primary id",this.primaryRecordId);
                console.log(this.primaryRecord,"primary record");

                this.secondaryRecord=this.selectIdList.find((record)=>{
                        return record.Id!==this.primaryRecordId;
                })
                this.secondaryRecordId=this.secondaryRecord.Id;
        }

        
        

        

        handleMerge(){
                updatemergedRecord({PrimaryId:this.primaryRecordId,SecondaryId:this.secondaryRecordId})
                .then((result)=>{
                        console.log("inside handle merge button");
                        const evt = new ShowToastEvent({
                        title: "Merge",
                        message: "your records are merged sucessfully",
                        variant: "success",
                        });
                        this.dispatchEvent(evt);
                })
                .catch((error)=>{
                        console.log("handle error");
                })
        }
}
