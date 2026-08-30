trigger OpportunityTrigger on Opportunity (before insert,before update) {
        if(Trigger.isBefore){
                if(Trigger.isInsert){
                        opportunityHandler.Created_OpportunityTriggerHandler(Trigger.new);
                }
                if(Trigger.isUpdate){
                        opportunityHandler.updated_OpportunityTriggerHandler(Trigger.new,Trigger.oldMap);
                }
        }



}

