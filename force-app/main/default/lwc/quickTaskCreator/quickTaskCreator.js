import { LightningElement,wire } from 'lwc';
import {refreshApex} from '@salesforce/apex'
import getTask from '@salesforce/apex/taskHandler.getTask';
import createTask from '@salesforce/apex/TaskHandler.createTask';
export default class QuickTaskCreator extends LightningElement {
        taskList;
        displayError;
        wiredResult
        @wire(getTask)
        getAllTask(result){
                this.wiredResult=result
                const {data,error}=result
                if(data){
                        this.taskList=data;
                        this.displayError=error;
                }
                if(error){
                        this.displayError=error;
                        this.taskList=undefined;
                }
        }

        taskSubject;
        newTaskToInsert;
        handleOnChange(event){
                this.taskSubject=event.target.value;
                console.log("tasksubject",this.taskSubject)
        }
        //imperative call to add an task
        addTask(){
                console.log("inside addtask")
                createTask({taskSubject:this.taskSubject})
                .then(result=>{
                        return refreshApex(this.wiredResult)
                })
                .then(() => {
                        console.log('Data refreshed successfully');
                })
                .catch(error=>{
                        this.displayError=error;
                })
        }
        

        
}