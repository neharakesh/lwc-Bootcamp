public with sharing class contactController {
    public contactController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        try {
            return [SELECT id, Name From Contact];
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsById(Id accId){
        try {
            return [SELECT id, Name,AccountId,	Do_not_Contact__c From Contact WHERE AccountId=:accId];
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Boolean updateContacts(List<Id> slectedContact){
        try {
            List<Contact> contactList= [SELECT id,Name,	Do_not_Contact__c FROM Contact WHERE id in:slectedContact];
            for(Contact con:contactList){
                con.Do_not_Contact__c=true;
            }
            update contactList;
            return true;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

}