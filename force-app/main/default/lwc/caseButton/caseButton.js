import { LightningElement } from 'lwc';

export default class CaseButton extends LightningElement {
        showFlow=false
        handleOnclick(){
                console.log("handleclick")
                this.showFlow=true;
        }
        handleStatus(event){
                console.log("inside handle status");

        }
        handleReset(){
                this.showFlow=false;
                console.log(this.showFlow)
                // const flow=this.template.querySelector('lightning-flow');
                // if(flow){
                //         flow.reset();
                //         console.log("valuee reset done")
                // }
                // console.log("inside handleReset")
        }
}
