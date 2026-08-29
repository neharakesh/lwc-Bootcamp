public with sharing class casesHandler {
    public casesHandler() {

    }
    @AuraEnabled
    public static List<Case>  getOpenCases(){
        try {
            return [SELECT id,Subject,Status FROM Case WHERE Status='New'];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //Task 7
    @AuraEnabled
    public static List<AggregateResult> getOpenCaseCount(){
        try {
            List<AggregateResult> result=[SELECT Count(Id) caseCount From Case WHERE status!='Closed'];
            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getCaseList(){
        try {
            return [SELECT id,CaseNumber,Status,Priority,Subject FROM Case WHERE Status!='Closed'];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(Cacheable=true)
    public static Case getCaseById(Id caseId){
        try {
            return [SELECT id,CaseNumber,Status,Priority FROM Case WHERE id=:caseId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Case updateCaseStatus(Id caseId){
        try {
            Case caseList=[SELECT Id,CaseNumber,Status,Subject FROM Case WHERE Id=:caseId LIMIT 1];
            caseList.Status='closed';
            update caseList;
            return caseList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable=true)
    public static List<Case> getCaseByAccountId(Id accountId,string Status,string Priority){
        try {
            return [SELECT id,CaseNumber,Status,Priority,accountId FROM Case WHERE accountId=:accountId AND Status=:Status And Priority=:Priority];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }




    @AuraEnabled(Cacheable=true)
    public static List<Case> getCaseListByAccountId(String accountId){
        try {
            return [SELECT id,CaseNumber,Status,Priority,Subject,AccountId FROM Case WHERE Status!='Closed' AND AccountId= :accountId ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}