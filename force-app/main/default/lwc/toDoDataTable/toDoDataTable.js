import { LightningElement,wire ,api} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getTask from '@salesforce/apex/todoHandler.getTask';

export default class ToDoDataTable extends LightningElement {
        columnName=[
                { label: 'Subject', fieldName: 'Subject' },
                { label: 'Status', fieldName: 'Status' },
                { label: 'Priority', fieldName: 'Priority' }
        ]
        @api taskcompleted;
        wiredResult;
        taskList;
        displayError;
        
        @wire(getTask)
        getAllTask(result){
                this.wiredResult=result; 
                const {data,error}=result;
                if(data){
                        this.taskList=data;
                        this.displayError='';
                }
                if(error){
                        this.taskList=undefined;
                        this.displayError=error;
                }
        }

        @api refreshTable(){
                return refreshApex(this.wiredResult);
        }
}