public with sharing class StarShowHandler {
    public static void calculateStarShow(Set<id> TheatreIds,Set<Date> ShowDate){
        //metadata information extracted 
        Booking_Setting__mdt config=Booking_Setting__mdt.getInstance('Default_Setting');
        Decimal ticketWeight=config.Ticket_Point_Weight__c;
        Decimal concessionWeight=config.Concession_Point_Weight__c;

        //quering shows which are on same date and  completed and in same theater
        List<Show__c> showsToEvaluate=[SELECT id,Theatre__c,Show_Date_Time__c,Name,Show_Status__c,(SELECT id,Tickets_Count__c,Concession_Items__c,Status__c FROM Booking__r WHERE Status__c='Confirmed') FROM Show__c WHERE Show_Status__c='Completed' AND DAY_ONLY(Show_Date_Time__c) IN:ShowDate AND Theatre__c In:TheatreIds];

        Map<string,List<Show__c>> groupedShows=new Map<string,List<Show__c>>();
        for(Show__c currentShow:showsToEvaluate){
            string groupKey=currentShow.Theatre__c + '_' + currentShow.Show_Date_Time__c.Date();
            if(!groupedShows.containsKey(groupKey)){
                groupedShows.put(groupKey);
            }
            groupedShows.get(groupKey).add(currentShow);
        }
        List<Show__c> updateList=new List<Show__c>();
        for(string key:groupedShows.keySet()){
            List<Show__c> showGroup=groupedShows.get(key);

            Show__c winningShow=null;
            Decimal highestScore=-1;
            Decimal earliestTime=null;

            for(Show__c currentShow:showGroup){
                Decimal currentScore=0;
                for(Booking__c b:currentShow.Booking__r){
                    Decimal tickets = b.Tickets_Count__c != null ? b.Tickets_Count__c : 0;
                    Decimal concessions = b.Concession_Items__c != null ? b.Concession_Items__c : 0;
                    currentScore += (tickets * ticketWeight) + (concessions * concessionWeight);
                
                }
                Boolean isNewWinner=(currentScore>highestScore);
                Boolean isTie=(currentScore==highestScore &&
                                earliestTime!=null && currentShow.Show_Date_Time__c.Date()<earliestTime
                    );
                    if(isNewWinner || isTie){
                        winningShow=currentShow;
                        highestScore=currentScore;
                        earliestTime=currentShow.Show_Date_Time__c;
                    }
            }

            for(Show__c currentShow:showGroup){
                Boolean shouldBeStar=(currentShow.Id==winningShow.Id);

                if(currentShow.Star_Show_of_the_Day__c!=shouldBeStar){
                    currentShow.Star_Show_of_the_Day__c=shouldBeStar;
                    updateList.add(currentShow);
                }
            }

        }
        if (!updateList.isEmpty()) {
            update updateList;
        }
    }
}