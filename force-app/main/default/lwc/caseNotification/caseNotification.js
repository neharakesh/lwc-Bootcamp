import { LightningElement, wire } from 'lwc';

import {subscribe,
        unsubscribe,
        MessageContext
        } from 'lightning/messageService';

        import CASE_STATUS_MESSAGE from '@salesforce/messageChannel/statusMessageChannel__c';

        export default class CaseNotification extends LightningElement {

        subscription = null;

        notificationMessage;


        @wire(MessageContext)
        messageContext;


        connectedCallback() {

                this.subscribeToMessageChannel();
        }


        subscribeToMessageChannel() {

                if (!this.subscription) {

                this.subscription = subscribe(
                        this.messageContext,
                        CASE_STATUS_MESSAGE,
                        (message) => this.handleMessage(message)
                );

                console.log('Subscribed to LMS');
                }
        }


        handleMessage(message) {

                console.log('Message Received:', message);

                this.notificationMessage =
                `Case ${message.caseNumber} has been marked as ${message.status}.`;
        }


        disconnectedCallback() {

                this.unsubscribeFromMessageChannel();
        }


        unsubscribeFromMessageChannel() {

                if (this.subscription) {

                unsubscribe(this.subscription);

                this.subscription = null;

                console.log('Unsubscribed from LMS');
                }
        }
}