import { LightningElement } from 'lwc';

export default class EmployeeDashboard extends LightningElement {

        
        employeeName = 'John Smith';
        employeeRole = 'Salesforce Developer';
        department = 'IT Department';
        experience = 3;
        numberProjects = 8;
        primarySkill = 'Apex';

        isfirstEmployee=true;

        handleSubmit(){
                this.isfirstEmployee=!this.isfirstEmployee;
                if(this.isfirstEmployee){
                        this.employeeName = 'John Smith';
                        this.employeeRole = 'Salesforce Developer';
                        this.department = 'IT Department';
                        this.experience = 3;
                        this.numberProjects = 8;
                        this.primarySkill = 'Apex';

                }else
                {
                        this.employeeName = 'maria';
                        this.employeeRole = 'LWC Developer';
                        this.department = 'IT Department';
                        this.experience = 7;
                        this.numberProjects = 2;
                        this.primarySkill = 'Apex+LWC';
                }
                
        }
}