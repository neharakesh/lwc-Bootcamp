import { LightningElement, track } from 'lwc';

export default class Tabs extends LightningElement {
        @track tabs = [
                {id: 0, label: 'Tab 1', display: true, message: 'This is tab 1'},
                {id: 1, label: 'Tab 2', display: false, message: 'This is tab 2'},
                {id: 2, label: 'Tab 3', display: false, message: 'This is tab 3'},
                {id: 3, label: 'Tab 4', display: false, message: 'This is tab 4'},
        ];

        handleTabChange(event) {
                const tabId = Number(event.target.dataset.id);
                console.log('tab id: ', tabId);
                
                this.tabs = this.tabs.map((tab, idx)=>{
                        
                        return {
                                ...tab,
                                display: tab.id === tabId
                        }
                })

                console.log('Tabs: ', JSON.stringify(this.tabs));
                
        }
}