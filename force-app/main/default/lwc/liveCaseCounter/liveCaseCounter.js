import { LightningElement ,api} from 'lwc';
import getOpenCaseCount from '@salesforce/apex/casesHandler.getOpenCaseCount'
export default class LiveCaseCounter extends LightningElement {
        @api openCaseCount;
        @api displayError;
        @api intervalObj;
        @api currentTime;
        @api connectedCallback(){
                
                this.intervalObj = setInterval(()=>{
                        this.displayError=''
                        getOpenCaseCount()
                        .then(result=>{
                                console.log("run after evry 5 secnds")
                                this.openCaseCount=result[0].caseCount;
                                let now=new Date();
                                let hours=now.getHours();
                                let minutes=now.getMinutes();
                                let seconds=now.getSeconds();
                                let time=`${hours}:${minutes}:${seconds}`
                                this.currentTime=time;
                                console.log(this.currentTime)
                        
                        })
                        .catch(error=>{
                                this.displayError=error.body.message;
                                
                        })
                        
                },5000)
                
        }

        @api disconnectedCallback(){
                clearInterval(this.intervalObj);
        }

}