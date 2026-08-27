trigger Task1Mentor on Show__c (after update) {
        Set<Id> TheatreIds=new Set<Id>();
        Set<Date> showDate=new Set<Date>();

        for(Show__c newShow:trigger.new){
                Show__c oldShow=trigger.oldMap.get(newShow.Id);
                if(newShow.Show_Status__c=='Completed' &&(oldShow.Show_Status__c!='Completed' || newShow.Theatre__c!=oldShow.Theatre__c)){
                        if(newShow.Theatre__c!=null && newShow.Show_Date_Time__c!=null){
                                TheatreIds.add(newShow.Theatre__c);
                                showDate.add(newShow.Show_Date_Time__c.date());
                        }
                }
        }
        if(!TheatreIds.isEmpty() && showDate.isEmpty()){
                StarShowHandler(TheatreIds,showDate);
        }
}
