import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/accountHandler.getAccounts';
export default class CaseFilter extends LightningElement {
        accountList;
        accountId;
        caseStatus;
        casePriority;
        // priorityvalue="low";
        // statusvalue="New";

        get status() {
                return [
                { label: 'New', value: 'new' },
                { label: 'Working', value: 'Working' },
                { label: 'Escalated', value: 'Escalated' },
                ];
        }

        get priority() {
                return [
                { label: 'Low', value: 'Low' },
                { label: 'Medium', value: 'Medium' },
                { label: 'High', value: 'high' },
                ];
        }



        @wire(getAccounts)
        getAllAccounts(result){
                const {data,error}=result;
                if(data){

                
                this.accountList=data.map((account)=>{
                        return{
                                label:account.Name,
                                value:account.Id

                        }
                })
                }
                if(error){
                        this.displayError=error.body.message;
                }
        }
        
        
        handleAccountID(event){
                this.accountId=event.detail.value;
                const myEvent=new CustomEvent('sendaccountid',{
                        detail:this.accountId
                })
                this.dispatchEvent(myEvent);
        }
        handleStatus(event){
                this.caseStatus=event.detail.value;
                const myEvent=new CustomEvent('sendstatus',{
                        detail:this.caseStatus
                })
                this.dispatchEvent(myEvent)
        }
        handlePriority(event){
                this.casePriority=event.detail.value;
                const myEvent=new CustomEvent('sendpriority',{
                        detail:this.casePriority
                })
                this.dispatchEvent(myEvent)
        }
}