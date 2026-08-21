import { LightningElement ,api} from 'lwc';

export default class Child extends LightningElement {
        @api productId
        @api productName;
        @api productRating;
}