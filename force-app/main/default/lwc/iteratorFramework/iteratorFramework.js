import { LightningElement } from 'lwc';

export default class IteratorFramework extends LightningElement {
        tasklist=[
               
                {taskid:2,taskName:'FirstTask',taskPriority:'Medium',taskProgress:'Cancelled'},
                {taskid:3,taskName:'SecondTAsk',taskPriority:'Low',taskProgress:'In Progress'},
                {taskid:1,taskName:'ThirdTAsk',taskPriority:'Low',taskProgress:'Pending'},
        
        ];
}