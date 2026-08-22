public with sharing class accountHandler {
    public accountHandler() {

    }
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT id,Name,Phone From Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    // @AuraEnabled(Cacheable=true)
    // public static List<Contact> getContactsByAccountId(Id accountId){
    //     try {
    //         return [SELECT id,AccountId ,Name from Contact Where AccountId=:accountId];
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    //get cases by id
    @AuraEnabled(Cacheable=true)
    public static List<Case> getCasesByAccountId(Id id){
        try {
            return [SELECT id,Subject,status,AccountId FROM Case WHERE AccountId=:id];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void resolveCase(Id id){
        try {
            List<Case> caselist=[SELECT Subject,AccountId,Status FROM Case WHERE AccountId=:id];
            caselist[0].Status='Closed';
            update caselist;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccountRecord(string accountName){
        try {
            return [SELECT id,Name FROM Account WHERE Name=:accountName];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    
}