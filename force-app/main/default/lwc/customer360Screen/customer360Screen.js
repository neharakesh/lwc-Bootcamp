import { LightningElement,wire ,api} from 'lwc';
import getAccountById from '@salesforce/apex/customer360Screen.getAccountById';
import getContactsByAccountId from '@salesforce/apex/customer360Screen.getContactsByAccountId';
import getOpportunitysByAccountId from '@salesforce/apex/customer360Screen.getOpportunitysByAccountId';
import getCaseByAccountId from '@salesforce/apex/customer360Screen.getCaseByAccountId';
export default class Customer360Screen extends LightningElement {
        @api accountId;
        accountList;
        contactList;
        opportunityList;
        caseList;
        @api opportunityId;

        accountError;
        contactError;
        opportunityError;
        CaseError;

        
        @wire(getAccountById,{accountId:'$accountId'})
                getAllAccounts(result){
                        const {data,error}=result;
                        console.log(this.accountId,"accountId")
                        if(data){
                                this.accountList=data;
                                this.accountError='';
                                        
                        
                }
                if(error){
                                this.displayError=error;
                                this.accountList=undefined;
                        }
        }

        @wire(getContactsByAccountId,{accountId:'$accountId'})
                getAllContactsByAccountId(result){
                        const {data,error}=result;
                        
                        if(data){
                                this.contactList=data;
                                this.contactError='';
                                        
                        
                }
                if(error){
                                this.contactError=error;
                                this.contactList=undefined;
                        }
}

@wire(getOpportunitysByAccountId,{accountId:'$accountId'})
                getAllOpportunitysByAccountId(result){
                        const {data,error}=result;
                        
                        if(data){
                                this.opportunityList=data;
                                this.opportunityError='';
                                        
                       
                }
                 if(error){
                                this.opportunityError=error;
                                this.opportunityList=undefined;
                        }
}

@wire(getCaseByAccountId,{accountId:'$accountId'})
                getAllCaseByAccountId(result){
                        const {data,error}=result;
                        
                        if(data){
                                this.caseList=data;
                                this.caseError='';
                                        
                        
                }
                if(error){
                                this.opportunityError=error;
                                this.opportunityList=undefined;
                        }
}


//get count of contacts

// get countContact(){
//         return this.contactList.length;
// }
// //get count of opportunites
// get countOpp(){
//         return this.opportunityList.length;
// }

// get countCase(){
//         return this.caseList.length;
// }
// get oppAmount(){
//         this.opportunityList.reduce((total,opp)=>{
//                 return total +(opp.Amount || o)
//         },0);
// }


handleOpportunityOnClick(event){
        this.opportunityId=event.currentTarget.dataset.id;
        console.log("opportunity",this.opportunityId)
}
}