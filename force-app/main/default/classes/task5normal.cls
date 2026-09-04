public with sharing class task5normal {
    public task5normal() {

    }
    public static void calculate(){
        List<Property3__c> propertyList=[SELECT id,Agent__c,Close_Date__c,Status__c,Sale_Price__c From Property3__c Group By Agent__c];
    }
}