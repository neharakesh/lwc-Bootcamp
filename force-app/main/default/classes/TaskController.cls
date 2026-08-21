public with sharing class TaskController {
    
    public TaskController(){

    }
    @AuraEnabled(Cacheable=true)
    public static List<Tasks__c> getTaskByProject(Id projectId){
        
        
        return [select id,Name,status__c from Tasks__c Where Project__c=:projectId];
        
    }


    @AuraEnabled(Cacheable=false)
    public static void createTask(Id id,String title){
        Tasks__c newTask=new Tasks__c(
            
            Name=title,
            Project__c=id,
            status__c='In Progress'
            );
            insert newTask;
    }
    
    @AuraEnabled(Cacheable=false)
    public static void updateTaskStatus(Id taskid,String status){
        List<Tasks__c> updateTask=[SELECT id,Name,Status__c From Tasks__c WHERE Project__c= :taskid ];
        updateTask[0].Status__c=status;

        update updateTask;
    
    }
}