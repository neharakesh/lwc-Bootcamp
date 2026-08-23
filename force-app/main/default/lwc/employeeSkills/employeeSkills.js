import { api, LightningElement } from 'lwc';

export default class EmployeeSkills extends LightningElement {
        @api experience;

        @api numberOfProjects;
}