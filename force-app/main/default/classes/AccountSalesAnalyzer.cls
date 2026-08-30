public with sharing class AccountSalesAnalyzer {
    public static void getAccountSalesPerformance(){
        List<Account> accountList=new List<Account>();

        List<AggregateResult> AggregateData=[SELECT AccountId accountId, Count(Id) OppCount, Sum(Amount) TotalAmount, Avg(Amount) AverageAmount FROM Opportunites WHERE accountId!=null AND StageName='Closed Won' Group By accountId Having Sum(Amount)>10000 AND Count(Id)>=3];

        for(AggregateResult data:AggregateData){
            Id oppId=(Id)data.get('accountId');
            Decimal TotalAmount=(Decimal)data.get('TotalAmount');
            Decimal AverageAmount=(Decimal)data.get('AverageAmount');
            
        }

    }
}