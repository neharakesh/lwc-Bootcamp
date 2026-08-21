public with sharing class ProjectController {
    
    
    public ProjectController(){
        
    }
    @AuraEnabled(Cacheable=true)
    public static List<	Projects__c> getProject(){
        try {
            
                return [Select id,status__c,Name from 	Projects__c];
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}