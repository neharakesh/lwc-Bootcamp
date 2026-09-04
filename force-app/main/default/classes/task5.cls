public with sharing class task5 implements Database.Batchable<SObject>, Database.RaisesPlatformEvents {

    public Database.QueryLocator start(Database.BatchableContext context) {
        
        return Database.getQueryLocator([SELECT Id FROM SObject]);
    }

    public void execute(Database.BatchableContext context, List<SObject> scope) {

    }

    public void finish(Database.BatchableContext context) {

    }
}
