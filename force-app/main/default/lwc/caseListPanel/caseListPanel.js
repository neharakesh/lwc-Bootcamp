import { LightningElement } from 'lwc';
import getOpenCases from '@salesforce/apex/casesHandler.getOpenCases'
export default class CaseListPanel extends LightningElement {
        caseList;
        displayError;
        connectedCallback(){
                getOpenCases()
                .then(result=>{
                        this.caseList=result;
                })
                .catch(error=>{
                        this.displayError=error;
                })
        }
        handleCase(){
                getOpenCases()
                .then(result=>{
                        this.caseList=result;
                })
                .catch(error=>{
                        this.displayError=error;
                })
        }
}