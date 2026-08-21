import { LightningElement ,api} from 'lwc';

export default class GrandChild extends LightningElement {
        @api productRating;
        @api productName
}