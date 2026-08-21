public with sharing class taskHandler {
    public taskHandler() {

    }
    @AuraEnabled(Cacheable=true)
    public static List<Task> getTask(){
        try {
            return [SELECT Id,Subject,Priority FROM Task];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    //create task Method
    @AuraEnabled(cacheable=false)
    public static void createTask(string taskSubject){
        try {
            Task newTask=new Task(
                subject=taskSubject
            );
            insert newTask;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}