import { LightningElement, wire } from 'lwc';

import getProjects from '@salesforce/apex/ProjectController.getProject'
import getTasks from '@salesforce/apex/TaskController.getTaskByProject'
import updateTaskStatus from '@salesforce/apex/TaskController.updateTaskStatus'
import createTask from '@salesforce/apex/TaskController.createTask'
import openCase from '@salesforce/apex/TaskController.openCase';
export default class ProjectTaskManager extends LightningElement {
        displayError;
        ListProject=[];
        
        taskColumn = [
        {
                label: 'Task Name',
                fieldName: 'Name'
        },
        {
                label: 'Task Id',
                fieldName: 'id'
        },
        {
                label: 'Status',
                fieldName: 'Status__c'
        }
];
        
        @wire(getProjects)
        ProjectData({data,error}){
                try{
                        if(data){
                        this.ListProject=data;
                        console.log('ListObject',this.ListProject);
                        
                        this.displayError='';
                }
                if(error){
                        this.displayError=error.body.message;
                        this.ListProject=undefined;
                }
                }
                catch(exception){
                        console.log("error got")
                }
        

        }
        
        variableId;
        handleOnEachProject(event){
                this.variableId=event.target.dataset.id;
                console.log(this.variableId,'id')

        }

        
        displayTaskError;
        showTask;
        @wire(getTasks,{projectId:'$variableId'})//dynamic binding
        taskData(result){
                
                const {data,error}=result
                if(data){
                        this.showTask=data;
                        this.displayTaskError='';
                }
                if(error){
                        this.displayTaskError=error;
                        this.showTask=undefined;
                }
        }

        handleSelectedRow(event){
                const selectedRow=event.detail.selectedRows;
                console.log('selected Rows: ',selectedRow)
                if(selectedRow.length>0){
                        const taskId=selectedRow[0] ? selectedRow[0].Id : 'Boooooo';
                        console.log(taskId,"row")
                        updateTaskStatus({taskid:taskId,status:"Completed"})
                                .then((result)=>{
                                        console.log('Successfully updated')
                                })
                                .catch((error)=>{
                                        console.log("got error",error)
                                })
                        
                }
                

        }
        //create a new Task
        newTaskName;
        handleOnChange(event){
                this.newTaskName=event.target.value;
                console.log(this.newTaskName)
        }
        handleAddTask(){
                createTask({
                        id:this.variableId,
                        title:this.newTaskName})
                        .then(()=>{
                                console.log('new task created');
                        })
                        .catch((error)=>{
                                console.log("an error occured")
                        })
                
        }
        get openCaseCount(){
                return openCase();
        }
        
}