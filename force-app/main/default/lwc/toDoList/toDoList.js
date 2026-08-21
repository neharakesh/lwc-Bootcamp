import { LightningElement,track } from 'lwc';
import createTask from '@salesforce/apex/todoHandler.createTask';
import deleteTask from '@salesforce/apex/todoHandler.deleteTask';

import updateStatus from '@salesforce/apex/todoHandler.updateStatus'
export default class ToDoList extends LightningElement {
        arr=[
                {
                name:"Wakeup",
                checked:false,
                
        },
        {
                name:"study",
                checked:false
        }

];
        addItem;
        
        handleOnChange(event){
                this.addItem=event.target.value;
                console.log(this.addItem)
                
        }
        
        

        
        add(){
                
                createTask({taskSubject:this.addItem})
                .then((result)=>{
                        this.arr=[...this.arr,{

                        name:result.Subject,
                        checked:false,
                        Id:result.Id
                        
                }];
                console.log("result",JSON.stringify(result))
                console.log("updated array",JSON.stringify(this.arr))
                console.log('after adding in array')
                
                localStorage.setItem('todolist',JSON.stringify(this.arr));
                })
                .catch(()=>{
                        console.log("error")
                })
                this.addItem = '';
                
                
                
        }
        //handling checkbox
        handleCheckbox(event){
                const itemId = event.target.dataset.id;
                updateStatus({taskId:itemId})
                .then((result)=>{
                        console.log("print result", result)
                        this.arr = this.arr.filter(
                        item => item.Id !== itemId
                );
                this.dispatchEvent(
                        new CustomEvent('taskcompleted') 
                );
                localStorage.setItem('todolist',JSON.stringify(this.arr));
                
                })
                .catch((error)=>{
                        console.log(error.body.message);
                })
                
        
        }
        //delete task
        handleDelete(event) {

        const itemId = event.target.dataset.id;

        console.log('Task Id:', itemId);

        deleteTask({taskId: itemId })
                .then((result) => {

                console.log('Delete from Salesforce');
                        console.log("result",result)
                this.arr = this.arr.filter(
                        item => item.Id !== itemId
                );

                localStorage.setItem(
                        'todolist',
                        JSON.stringify(this.arr)
                );
                })
                .catch((error) => {
                console.error(
                        'Delete error:',
                        error?.body?.message || error
                );
                });
}
        connectedCallback(){
                const addsavedTask=localStorage.getItem('todolist');
                
                console.log('todolist: ', addsavedTask);
                
                

                if(addsavedTask){
                        this.arr=JSON.parse(addsavedTask);
                }
        }
        

}