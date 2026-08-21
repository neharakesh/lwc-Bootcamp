import { LightningElement , wire} from 'lwc';
import {refreshApex} from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getAccounts from '@salesforce/apex/accountHandler.getAccounts';
import getCasesByAccountId from '@salesforce/apex/accountHandler.getCasesByAccountId';
import resolveCase from '@salesforce/apex/accountHandler.resolveCase';
export default class SupportConsole extends LightningElement {
        listAccounts;
        diplayError;
        wiredResult;
        //presenting all the accounts
        @wire(getAccounts)
        getAllAccounts(result){
                const {data,error}=result
                if(data){
                        this.listAccounts=data;
                        this.diplayError='';
                }
                if(error){
                        this.diplayError=error;
                        this.listAccounts=undefined;
                }

        }
        accountId;
        caseList;
        CaseError;
        handleId(event){
                this.accountId=event.currentTarget.dataset.id;
                console.log(this.accountId,"accountId");
        }

        @wire(getCasesByAccountId,{id:'$accountId'})
        getCases(result){
                this.wiredResult=result;
                console.log("inside wire")
                if(result.data){
                        this.caseList=result.data;
                        this.CaseError=undefined;
                        console.log(JSON.stringify(this.caseList),"data list of cases")
                }
                if(result.error){
                        this.CaseError=result.error;
                        this.caseList=[];
                }
        }

        //resolve Case
        
        handleResolveCase(){
                
                resolveCase({id:this.accountId})
                .then(()=>{
                        console.log('inside resolve case');

                        this.dispatchEvent(
                        new ShowToastEvent({
                                title: 'Success!',
                                message: 'The record has been updated successfully.',
                                variant: 'success',
                                mode: 'dismissable'
                        })
                        );
                        console.log("inside resolve case");
                        return refreshApex(this.wiredResult)
                        
                })
                
                .catch((error)=>{
                        console.log(error.body.message,"got error")
                })
        }

        // get openCaseCount(){
        //         return this.caseList?this.caseList.filter(c=>c.Status!="Closed").length:0;
        // }
}