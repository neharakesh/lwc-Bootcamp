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
    @AuraEnabled
    public static List<Opportunity> getOpportunityById(Id oppId){
        try {
            return [SELECT id,Name,	StageName,Amount,CloseDate FROM Opportunity WHERE id=:oppId LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}