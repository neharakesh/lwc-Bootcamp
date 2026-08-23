import { LightningElement } from 'lwc';

export default class LeaveManager extends LightningElement {

        employeeName = 'Neha Rajpoot';
        leaveBalance = 12;
        successMessage = '';

        handleLeaveRequest(event) {
        const leaveRequest = event.detail;
        console.log('Number of Days:', leaveRequest.numberOfDays);

        this.successMessage = 'Leave request submitted successfully.';
        }
}