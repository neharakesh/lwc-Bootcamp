import { LightningElement } from 'lwc';

export default class LiveCaseCounterParent extends LightningElement {
        isVisible=true;
        handleOnClick(event){
                console.log("inside handle click")
                this.isVisible= !this.isVisible;
        }
}