public with sharing class task3handler {
    public task3handler(){

    }
    @AuraEnabled(Cacheable=true)
    public static List<Offer__c> getProperty(Id getId){
        try {
            return [SELECT id, Property3__c,Agent__c,Status__c,Offer_Amount__c,Buyer__c From Offer__c Where Status__c='Draft' AND Property3__c=:getId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static Boolean updatemergedRecord(Id PrimaryId,Id SecondaryId){
        try {
            List<Offer__c> newList=[SELECT Id,Status__c FROM Offer__c  WHERE Id =:SecondaryId LIMIT 1];
            if(!newList.isEmpty()){
                newList[0].Status__c='WithDraw';
                update newList;
            }
            List<Offer__c> mergedList=[SELECT Id,Status__c,Agent__c FROM Offer__c];
            Offer__c primaryOffer;
            Offer__c secondaryOffer;
            for(Offer__c each_Offer:mergedList){
                if(each_Offer.Id==PrimaryId){
                    primaryOffer=each_Offer;
                }
                if(each_Offer.Id==SecondaryId){
                    secondaryOffer=each_Offer;
                }
            }

            if(primaryOffer.Agent__c==null && secondaryOffer.Agent__c!=null){
                primaryOffer.Agent__c=secondaryOffer.Agent__c;
            }
            update new List<Offer__c>{
                primaryOffer
            };
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable=true)
    public static List<Offer__c> getSelectedOffer(List<Id> newlist){
        try {
            return [SELECT id, Property3__c,Agent__c,Status__c,Offer_Amount__c From Offer__c Where Property3__c In:newlist];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


}

