import { LightningElement } from 'lwc';
import getRiskyData from '@salesforce/apex/riskHandler.getRiskyData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RiskyDataLoader extends LightningElement {
        simulateError=false;
        

        handleCheckBox(event){
                console.log("inside handler")
                this.simulateError=event.target.checked;
                console.log(this.simulateError);
                getRiskyData({simulateError:this.simulateError})
                .then((result)=>{
                        const event=new ShowToastEvent({
                                title: 'Success!',
                                message: result,
                                variant: 'success', 
                                mode: 'dismissable' 
                        })
                        this.dispatchEvent(event);
                }).catch(error=>{
                        console.log(JSON.stringify(error))
                        const event=new ShowToastEvent({
                                title: 'Success!',
                                message: error.body.message,
                                variant: 'error', 
                                mode: 'dismissable' 
                        })
                        this.dispatchEvent(event);
                })
                
                
                

                
        }
}