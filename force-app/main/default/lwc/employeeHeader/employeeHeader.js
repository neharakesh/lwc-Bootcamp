import { LightningElement, api} from 'lwc';

export default class EmployeeHeader extends LightningElement {
        @api employeeName;
        @api employeeRole;
        @api department;


}