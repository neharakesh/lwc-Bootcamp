public with sharing class riskHandler {
    public riskHandler() {

    }
    @AuraEnabled
    public static string getRiskyData(Boolean simulateError){
        try {
            if(simulateError){
                throw new AuraHandledException('show error');
                
            }
            return '';
        } catch (Exception e) {
            throw new AuraHandledException('Show');
        }
    }
    
}