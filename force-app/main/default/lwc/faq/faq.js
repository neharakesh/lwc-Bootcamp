import { LightningElement } from 'lwc';

export default class Faq extends LightningElement {

        data = [
                {
                id: 1,
                question: "What is the return policy?",
                answer: "You can return any item within 30 days of purchase.",
                showAnswer: false
                },
                {
                id: 2,
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3 to 5 business days.",
                showAnswer: false
                },
                {
                id: 3,
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide.",
                showAnswer: false
                }
        ];
 
        handleExpand(event) {

                let index = Number(event.target.dataset.index);

                this.data = this.data.map((item, i) => {

                if (i === index) {
                        item.showAnswer = !item.showAnswer;
                } else {
                        item.showAnswer = false;
                }

                return item;
                });
        }
        }