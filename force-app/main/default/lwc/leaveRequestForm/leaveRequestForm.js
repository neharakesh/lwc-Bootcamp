import { LightningElement, api } from 'lwc';

export default class LeaveRequestForm extends LightningElement {

    // Parent → Child
    @api leaveBalance;
        leaveType = '';
        startDate = '';
        endDate = '';
        reason = '';
        errorMessage = '';

        leaveTypeOptions = [
                {
                label: 'Casual Leave',
                value: 'Casual Leave'
                },
                {
                label: 'Sick Leave',
                value: 'Sick Leave'
                },
                {
                label: 'Earned Leave',
                value: 'Earned Leave'
                }
        ];

        handleLeaveTypeChange(event) {
                this.leaveType = event.target.value;
        }

        handleStartDateChange(event) {
                this.startDate = event.target.value;
        }

        handleEndDateChange(event) {
                this.endDate = event.target.value;
        }

        handleReasonChange(event) {
                this.reason = event.target.value;
        }

        handleSubmit() {
        this.errorMessage = '';

        
        if (!this.leaveType || !this.startDate || !this.endDate || !this.reason) {
                this.errorMessage = 'fill all the fields';
                return;
        }

        
        if (this.endDate < this.startDate) {
                this.errorMessage ='End Date cannot be before Start Date.';
                return;
        }

        
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const difference = end - start;
        const numberOfDays =
            Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

        console.log('Requested Days:', numberOfDays);
        console.log('Available Balance:', this.leaveBalance);

        
        if (numberOfDays > this.leaveBalance) {
        this.errorMessage =`You have only ${this.leaveBalance} days available. ` + `You requested ${numberOfDays} days.`;
                return;
        }

        
        const leaveRequestEvent = new CustomEvent('leaverequest',{
                detail: {
                        leaveType: this.leaveType,
                        startDate: this.startDate,
                        endDate: this.endDate,
                        reason: this.reason,
                        numberOfDays: numberOfDays
                }}
        );

        this.dispatchEvent(leaveRequestEvent);

        
        this.leaveType = '';
        this.startDate = '';
        this.endDate = '';
        this.reason = '';
        }
}