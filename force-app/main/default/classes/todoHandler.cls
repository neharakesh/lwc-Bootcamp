public with sharing class todoHandler {
    public todoHandler() {

    }
    @AuraEnabled
    public static Task createTask(string taskSubject){
        try {
            Task newTask=new Task(
                Subject=taskSubject,
                ActivityDate=Date.today().addDays(5),
                OwnerId=userInfo.getUserId()
            );
            insert newTask;
            return newTask;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Boolean deleteTask(Id taskId){
        try {
            List<Task> deleteItem=[SELECT id From Task WHERE id=:taskId];
            delete deleteItem;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(Cacheable=true)
    public static List<Task> getTask(){
        try {
            return [SELECT id,Subject,Status FROM Task WHERE Status='Completed' LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean updateStatus(Id taskId){
        try {
            List<Task> taskItem=[SELECT id,Status FROM Task WHERE id=:taskId];
            taskItem[0].Status='Completed';
            update taskItem;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}