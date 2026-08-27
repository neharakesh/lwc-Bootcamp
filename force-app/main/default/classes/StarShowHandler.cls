public with sharing class StarShowHandler {
    public static void calculateStarShow(Set<id> TheatreIds,Set<id> ShowDate){
        //metadata information extracted 
        Booking_Setting__mdt config=Booking_Setting__mdt.getInstance('Default_Setting');
        Decimal ticketWeight=config.Ticket_Point_Weight__c;
        Decimal concessionWeight=config.Concession_Point_Weight__c;

        //quering shows which are on same date and  completed and in same theater
        List<Show__c> latestShows=[SELECT id,Theatre__c,Show_Date_Time__c,Name,Show_Status__c FROM Show__c WHERE Show_Status__c='Completed' GROUP BY Theatre__c];

    }
}