import { LightningElement, wire } from 'lwc';
import searchContacts from '@salesforce/apex/searchContactsHandle.searchContacts'
export default class ContactSearch extends LightningElement {
        searchName;
        showListContact;
        showError;
        handleinput(event){
                this.searchName=event.target.value;
                console.log(this.searchName)
        }
        @wire(searchContacts,{searchTerm:'$searchName'})
        searchableContacts({data,error}){
                
                if(data){
                        this.showListContact=data;
                        this.showError='';
                        
                }
                if(error){
                        this.showError=error;
                        this.showListContact=undefined;
                }
        }
}