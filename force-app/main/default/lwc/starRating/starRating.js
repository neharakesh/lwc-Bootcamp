import { LightningElement } from 'lwc';

export default class StarRating extends LightningElement {

    selectedRating = 0;
    hoverRating = 0;

    star = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
    ];

    get stars() {
        const rating = this.hoverRating || this.selectedRating;

        return this.star.map(item => {
            return {
                ...item,
                icon: item.id <= rating
                    ? 'utility:favorite'
                    : 'utility:favorite_alt'
            };
        });
    }

    handleMouseOver(event) {
        this.hoverRating = Number(event.currentTarget.dataset.id);
    }

    handleMouseOut() {
        this.hoverRating = 0;
    }

    handleRating(event) {
        this.selectedRating = Number(event.currentTarget.dataset.id);
        this.hoverRating = 0;
    }

    handleClear() {
        this.selectedRating = 0;
        this.hoverRating = 0;
    }
}