public with sharing class searchContactsHandle {
    public searchContactsHandle() {

    }
    @AuraEnabled(Cacheable=true)
    public static List<Contact> searchContacts(String searchTerm){
        try {
            return [SELECT id,Name FROM Contact WHERE Name like :('%' + searchTerm +'%')];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}