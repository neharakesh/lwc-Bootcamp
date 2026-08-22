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
            return [SELECT id, Name,AccountId From Contact WHERE AccountId=:accId];
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

}