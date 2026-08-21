import { LightningElement } from 'lwc';

export default class ZodiacSign extends LightningElement {
        Signs = [
    {
        name: 'Aries',
        symbol: '♈',
        startMonth: 3,
        startDay: 21,
        endMonth: 4,
        endDay: 19
    },
    {
        name: 'Taurus',
        symbol: '♉',
        startMonth: 4,
        startDay: 20,
        endMonth: 5,
        endDay: 20
    },
    {
        name: 'Gemini',
        symbol: '♊',
        startMonth: 5,
        startDay: 21,
        endMonth: 6,
        endDay: 20
    },
    {
        name: 'Cancer',
        symbol: '♋',
        startMonth: 6,
        startDay: 21,
        endMonth: 7,
        endDay: 22
    },
    {
        name: 'Leo',
        symbol: '♌',
        startMonth: 7,
        startDay: 23,
        endMonth: 8,
        endDay: 22
    },
    {
        name: 'Virgo',
        symbol: '♍',
        startMonth: 8,
        startDay: 23,
        endMonth: 9,
        endDay: 22
    },
    {
        name: 'Libra',
        symbol: '♎',
        startMonth: 9,
        startDay: 23,
        endMonth: 10,
        endDay: 22
    },
    {
        name: 'Scorpio',
        symbol: '♏',
        startMonth: 10,
        startDay: 23,
        endMonth: 11,
        endDay: 21
    },
    {
        name: 'Sagittarius',
        symbol: '♐',
        startMonth: 11,
        startDay: 22,
        endMonth: 12,
        endDay: 21
    },
    {
        name: 'Capricorn',
        symbol: '♑',
        startMonth: 12,
        startDay: 22,
        endMonth: 1,
        endDay: 19
    },
    {
        name: 'Aquarius',
        symbol: '♒',
        startMonth: 1,
        startDay: 20,
        endMonth: 2,
        endDay: 18
    },
    {
        name: 'Pisces',
        symbol: '♓',
        startMonth: 2,
        startDay: 19,
        endMonth: 3,
        endDay: 20
    }
];

        EnteredName;
        EnteredDob;
        result;
        handleName(event){
                this.EnteredName=event.target.value;
        }
        handleDob(event){
                this.EnteredDob=event.target.value;
        }
        handleOnClick(event){
                try {
                        
                        this.result=this.ResultZodiac(this.EnteredDob);
                } catch (error) {
                        console.log('handleclick: ', error);
                        
                }
        }
        ResultZodiac(data){
                try{
                        console.log(data)
                        let date=new Date(data);
                        let month=date.getMonth();
                        let day=date.getDate();
                        for(let i=0;i<this.Signs.length;i++){
                                let sign=this.Signs[i];
                                let afterStart=month>sign.startMonth || (month===sign.startMonth && day>=sign.startDay)
                                let beforeEnd=month<sign.endMonth || (month===sign.endMonth && day<=sign.endDay)
                                if(afterStart && beforeEnd){
                                        return sign;
                                }
                        }
                        return null;
                } catch(error){
                        console.log(error.message)
                }
                
                
        }
}