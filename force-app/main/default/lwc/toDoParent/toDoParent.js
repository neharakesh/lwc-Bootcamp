import { LightningElement } from 'lwc';

export default class ToDoParent extends LightningElement {

        handleTaskCompleted(){
                console.log("inside handle Task event");
                const dataTable=this.tempelate.querySelector('c-to-do-data-table');
                if(dataTable){
                        this.refreshTable();
                }
        }
}
