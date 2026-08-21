import { LightningElement } from 'lwc';

export default class ButtonBasic extends LightningElement {
    clickedButtonLabel;
        displayNone=true;
        displayFirst=false;
        displaySecond=false;
    handleClick(event) {
        this.displayFirst=true;
        this.displaySecond=false;
        this.clickedButtonLabel = event.target.label;
        
        
    }
    handleClick2(event) {
        this.displayFirst=false;
         this.displaySecond=true;
        this.clickedButtonLabel = event.target.label;
        
    }
        
}