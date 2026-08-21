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
    
}