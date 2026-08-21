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
    

}