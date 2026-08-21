import { LightningElement,api } from 'lwc';

export default class Owner extends LightningElement {
        textField="example"
        productList=[
                {
                        id:1,
                        name:'laptop',
                        rating:'5'
                },
                {
                        id:1,
                        name:'phone',
                        rating:'4'
                }
                ,{
                        id:1,
                        name:'speaker',
                        rating:'3'
                }
        ]
        count=this.productList.length

        //call child Method
        // callChildMethod(){
        //         this.template.querySelector("c-container").handleContainer()
        // }
         changeData;
        handleOnChange(event){
                this.changeData=event.target.value
                console.log("data",this.changeData)
        }

}