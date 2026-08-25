import { LightningElement } from 'lwc';

export default class AccountOnboarding extends LightningElement {
        showFlow=false;
        Source='LWC Onboarding';
        get flowVariables() {
        return [
                {
                        name: 'Source',
                        type: 'String',
                        value: this.Source
                }
                ];
        }
        handleOnClick(){
                this.showFlow=true;
                console.log("inside handle click")
                console.log(this.showFlow)
        }
        handleChange(){
                console.log("inside Handle Change")
        }

}