trigger task2Trigger on Property3__c (before insert, before update, after update,after insert) {
        if(Trigger.isAfter){
                if(Trigger.isInsert){
                        task2.assignTask(Trigger.new);
                }
                if(Trigger.isInsert || Trigger.isUpdate){
                        task2.updateProperty(Trigger.new,Trigger.oldMap);
                }
        }
}