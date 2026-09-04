import { LightningElement, wire } from 'lwc';
import getCommision from '@salesforce/apex/task4handler.getCommision'
import updateCommission from '@salesforce/apex/task4handler.updateCommission'
import { refreshApex } from '@salesforce/apex';
const actions = [
        { label: 'Approve', name: 'Approve' },
        
        ];
export default class Task4 extends LightningElement {
        CommissionList;
        CommissionError;
        rowOffset=0;
        draftValues=[];
        wiredResult;
        
        columns=[
                {
                        label:'Name',
                        fieldName:'Name'
                },
                {
                        label:'Agent',
                        fieldName:'Agent__c'
                },
                {
                        label:'Property3__c',
                        fieldName:'Property3__c'
                },
                {
                        label:'Commission type',
                        fieldName:'Property__c'
                },
                {
                        label:'Base_Commission_Amount__c type',
                        fieldName:'Base_Commission_Amount__c'
                },
                {
                        label:'Bonus_Amount__c type',
                        fieldName:'Bonus_Amount__c',
                        editable:true
                },
                {
                        label:'Net_Commission__c type',
                        fieldName:'Net_Commission__c'
                },
                {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }

        ]

        @wire(getCommision)
        getAllCommission(result){
                this.wiredResult=result
                const{data,error}=result;
                if(data){
                        
                        this.CommissionList=data.map((result)=>{
                                return {
                                        ...result,Net_Commission__c:Number(result.Base_Commission_Amount__c || 0)+Number(result.Bonus_Amount__c ||0)
                                }
                        })
                        
                }
                if(error){
                        this.CommissionError=error;
                }


        }

                handleSave(event) {

                const draftValues = event.detail.draftValues;

                const updates = draftValues.map(draft => {

                const existingRecord = this.CommissionList.find(
                        record => record.Id === draft.Id
                );

                const bonus = Number(
                        draft.Bonus_Amount__c ??
                        existingRecord.Bonus_Amount__c ??
                        0
                );

                const base = Number(
                        existingRecord.Base_Commission_Amount__c ?? 0
                );

                return {
                        Id: draft.Id,
                        Bonus_Amount__c: bonus,
                        Net_Commission__c: base + bonus
                };
                });


                updateCommission({
                commissionList: updates
                })
                .then(() => {

                this.draftValues = [];

                return refreshApex(this.wiredResult);

                })
                .catch(error => {

                console.error('Update Error:', error);

                });
        }
        createCommission=false;
        handleCreateCommision(){
                this.createCommission=true;
        }

        handleRowAction(event){
                const actionName = event.detail.action.name;
                const row=event.detail.row;
                
                if(actionName==='Approve'){
                        rowAction({commissionId: row.Id })
                        .then((result)=>{
                                console.log(row.Id);
                                console.log(result,"result");
                                return refreshApex(this.wiredResult);
                        })
                        .catch((error)=>{
                                console.log(error.body.message);
                        })
                }
        }
        

}