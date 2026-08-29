public with sharing class customer360Screen {
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountById(Id accountId){
        try {
            return [SELECT id,Name FROM Account WHERE id=:accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(Cacheable=true)
    public static List<Contact> getContactsByAccountId(Id accountId){
        try {
            return [SELECT id,accountId,Name FROM Contact WHERE accountId=:accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunitysByAccountId(Id accountId){
        try {
            return [SELECT id,accountId,Name,StageName FROM Opportunity WHERE accountId=:accountId AND (StageName!='Closed Won' OR StageName!='Closed Lost')];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(Cacheable=true)
    public static List<Case> getCaseByAccountId(Id accountId){
        try {
            return [SELECT id,accountId,Subject,Status FROM Case WHERE accountId=:accountId AND (Status!='Closed')];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}