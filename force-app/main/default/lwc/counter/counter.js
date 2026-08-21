import { LightningElement ,track} from 'lwc';

export default class Counter extends LightningElement {
        variable=0;
        handleAdd(){
                
                this.variable+=1;
                console.log(this.variable)
                return this.variable
                

        }
        handleSub(){
                
                if(this.variable>0){
                        this.variable-=1;
                }
                
                console.log(this.variable)
                return this.variable
        }
}