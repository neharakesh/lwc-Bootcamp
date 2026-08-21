public with sharing class productController {
    public productController() {

    }
    @AuraEnabled(Cacheable=true)
    public static List<Product2> getProducts(){
        try {
            return [SELECT id,Name,Type FROM Product2];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}