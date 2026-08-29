import { LightningElement } from 'lwc';

export default class CaseManager extends LightningElement {
        accountId;
        status;
        priority;
        handlesendAccountId(event){
                this.accountId=event.detail;
                console.log(this.accountId,"accountId");
        } 
        handlesendStatus(event){
                this.status=event.detail;
                console.log(this.status,"statsus");
        }
        handlesendPriority(event){
                this.priority=event.detail;
                console.log(this.priority,"priority")
        }
}