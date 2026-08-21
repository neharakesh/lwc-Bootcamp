import { LightningElement ,api,track} from 'lwc';

export default class Reactivity extends LightningElement {
        @track myData=[
        {
        "_id": "6a8062423dd3ec57599e652a",
        "index": 0,
        "guid": "4a8e7b0e-8433-4b59-af16-8b37a6cd3baf",
        "isActive": true,
        "balance": "$3,894.67",
        "picture": "http://placehold.it/32x32",
        "age": 25,
        "eyeColor": "blue",
        "name": "Valarie Madden",
        "gender": "female",
        "company": "DANCITY",
        "email": "valariemadden@dancity.com",
        "phone": "+1 (963) 464-2236",
        "address": "714 Grafton Street, Dodge, Indiana, 1397",
        
        "registered": "2015-09-02T06:18:22 -06:-30",
        "latitude": -11.034048,
        "longitude": -141.601056,
        "tags": [
        "proident",
        "ullamco",
        "aute",
        "aute",
        "non",
        "do",
        "irure"
        ],
        "friends": [
        {
                "id": 0,
                "name": "Darla Bolton"
        },
        {
                "id": 1,
                "name": "Hart Ferrell"
        },
        {
                "id": 2,
                "name": "Eaton Terry"
        }
        ],
        "greeting": "Hello, Valarie Madden! You have 6 unread messages.",
        "favoriteFruit": "banana"
        }]
        add="banda"
        updateMethod(){
                this.add="helloo banda"
                this.myData[0].guid="6652a";
                this.myData[0].age="32";
                
        }
}