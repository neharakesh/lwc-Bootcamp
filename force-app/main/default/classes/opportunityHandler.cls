public with sharing class opportunityHandler {
    public opportunityHandler() {

    }
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity>  getOpportunity(){
        try {
            return [SELECT id,Name FROM Opportunity];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunityById(Id accountId){
        try {
            return [SELECT id,Name,	StageName,Amount,CloseDate,accountId FROM Opportunity WHERE accountId=:accountId AND (StageName!='Closed Won' OR StageName!='Closed Lost')];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean UpdateStage(Id oppId){
        try {
            Opportunity OpportunityList=[SELECT id,Name,StageName,Amount,CloseDate,accountId FROM Opportunity WHERE id= :oppId LIMIT 1];
            OpportunityList.StageName='Closed Won';
            update OpportunityList;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }




    //apex practise
    public static void Created_OpportunityTriggerHandler(List<Opportunity> newList){
        List<Opportunity> insertList=new List<Opportunity>();
        for(Opportunity eachOpp:newList){
            if(eachOpp.StageName=='Closed Won'){
                if (eachOpp.Amount>0) {
                    insertList.add(eachOpp);
                }
                else {
                    eachOpp.addError('Closed won opportunity with 0 amount can not be added');
                }
                
            }
        }
        insert insertList;
    }

    public static void updated_OpportunityTriggerHandler(List<Opportunity> newList,Map<Id,Opportunity> oldMap){
        List<Opportunity> updatedList=new List<Opportunity>();
        for (Opportunity each_opp : newList) {
            Opportunity eachOldOpp=oldMap.get(each_opp.Id);
            if(each_opp.Id==eachOldOpp.Id){
                if(each_opp.StageName=='Closed Won'){
                if (each_opp.Amount>0) {
                    updatedList.add(each_opp);
                }
                else {
                    each_opp.addError('Closed won opportunity with 0 amount can not be added');
                }
                
            }
            }
        }
        update updatedList;
    }


     public static void handleOppChange(List<Opportunity> newlist,Map<Id,Opportunity> oldMap){
                Set<Id> accountSet=new Set<Id>();
                for(Opportunity newopp:newlist){
                        Opportunity eachOldOpp=oldMap.get(newopp.Id);
                        if(newopp.Id==eachOldOpp.Id){
                                if(newopp.StageName!=eachOldOpp.StageName && newopp.StageName=='Closed Won'){
                                        accountSet.add(newopp.AccountId);
                                }
                        }
                        
                }
                if(!accountSet.isEmpty()){
                        system.enqueueJob(new practisequeable(accountSet));
                }

        }
}