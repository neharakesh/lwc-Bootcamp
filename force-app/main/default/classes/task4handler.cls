public with sharing class task4handler {
    public task4handler() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Commission__c> getCommision(){
        try {
            User currentUser=[SELECT id,UserRole.Name,Profile.Name from User WHERE Id = :UserInfo.getUserId()
            LIMIT 1 ];
            if (currentUser.Profile.Name == 'System Administrator') {

            return [
                SELECT Id, Agent__c,Base_Commission_Amount__c,Bonus_Amount__c,Name,Commission_Status__c,Property__c,Net_Commission__c 
                FROM Commission__c
            ];
        }
            string region;
            if(currentUser.UserRole!=null){
                string currentUserRole=currentUser.UserRole.Name;
                if(currentUserRole.contains('Regional Manager')){
                    region=currentUserRole.substringBefore('Regional Manager').trim();
                }
            }
                List<User> agentList=[SELECT id,Regional_Office__c From User WHERE UserRole.Name like:('%'+ region +'%')];
                Set<Id> agentId=new Set<Id>();
                for(User each_User:agentList){
                    agentId.add(each_User.Id);
                }
                List<Commission__c> commissionList=[SELECT id,Agent__r.Name,	Base_Commission_Amount__c,Bonus_Amount__c,Name,Commission_Status__c,Property__c,Net_Commission__c From Commission__c WHERE Agent__c In:agentId];
                return commissionList;
            
    
    
        }
        
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void updateCommission(List<Commission__c> commissionList) {
    try {
        update commissionList;
    }
    catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}

@AuraEnabled
public static Boolean rowAction(Id commissionId){
    try {
        List<Commission__c> commList=[SELECT id, Commission_Status__c from  Commission__c WHERE Id = :commissionId LIMIT 1];
        commList[0].Commission_Status__c='Approved';
        update commList;
        return true;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
}