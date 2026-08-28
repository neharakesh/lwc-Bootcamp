public with sharing class opportunityHandler {
    public opportunityHandler() {

    }
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity>  getOpportunity(){
        try {
            return [SELECT id,Name FROM Opportunity];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunityById(Id accountId){
        try {
            return [SELECT id,Name,	StageName,Amount,CloseDate,accountId FROM Opportunity WHERE accountId=:accountId AND (StageName!='Closed Won' OR StageName!='Closed Lost')];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean UpdateStage(Id oppId){
        try {
            Opportunity OpportunityList=[SELECT id,Name,StageName,Amount,CloseDate,accountId FROM Opportunity WHERE id= :oppId LIMIT 1];
            OpportunityList.StageName='Closed Won';
            update OpportunityList;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}