
import { LightningElement, track } from 'lwc';

export default class RadioGroupBasic extends LightningElement {
    value = '';
     options = [
            { id: 'archiveoption', label: 'Archive', value: 'option1' },
            { id: 'unarchiveoption',label: 'Unarchive', value: 'option2' },
        ];
 
    get getOptions() { 
        if(this.amountval > 1000) {
                return this.options.filter((opt)=>opt.id==='archiveoption');
        } else {
                return this.options.filter((opt)=>opt.id==='unarchiveoption');
                
        }
}
        amountval;
        handleAmount(event){
                this.amountval=event.target.value;
        }
        
        displaySelected=true;
        displayArchive=false;
        displayUnArchive=false;
        selectedOption;
        handleChange(event){
                this.selectedOption=event.target.value
        }
        get displayArchive(){
                this.selectedOption===Archive;
        }
        get displayUnArchive(){
                this.selectedOption===UnArchive;
        }
        handleArchive(event){
                this.displayArchive=true;
                this.displayUnArchive=false;
        }
         handleUnArchive(event){
                this.displayUnArchive=true;
                this.displayArchive=false;
        }


        
}