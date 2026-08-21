import { LightningElement ,api,track} from 'lwc';

export default class VariablesUnderstanding extends LightningElement {
        Name="Neha Rajpoot"
        @api Company="Absyz"
        @track myPersonality={
                names:"Vinod",
                age:91
        }
        handleWatchTime;
        currentDate=new Date().toLocaleString()
        SubscriberScore=9;
        memberStatus;
        updateStatus(event){
                this.memberStatus=event.target.value;
        }
        get handleWatchTimeMethod(){
                
              return  this.handleWatchTime*10;
        }
        set _handleWatchTimeMethod(event){
                
              this.handleWatchTime=event.target.value*10;
        }
}