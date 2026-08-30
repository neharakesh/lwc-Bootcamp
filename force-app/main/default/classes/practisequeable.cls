public with sharing class practisequeable implements Queueable, Finalizer {
    private Set<id> accountId;

    public practisequeable(Set<Id> accountId){
        this.accountId=accountId;
    }

    public void execute(QueueableContext context) {
        List<Account> updateList=new List<Account>();
        List<AggregateResult> result=[SELECT AccountId accountId,Sum(Amount) TotalOpportunity,Count(Id) countOpp FROM Opportunity WHERE StageName='Closed Won' Group BY AccountId];

        for(AggregateResult each_result:result){
            Id oppId=(Id)each_result.get('accountId');
            Decimal TotalAmount=(Decimal)each_result.get('TotalOppotunity');
            Integer CountOpportunity=(Integer)each_result.get('countOpp');

            Account acc=new Account(
                Id=oppId,
                AnnualRevenue=TotalAmount,
                NumberOfEmployees=CountOpportunity
            );
            updateList.add(acc);
        }
        if(!updateList.isEmpty()){
            update updateList;
        }
    }

    public void execute(FinalizerContext context) {
        if (context.getResult() == ParentJobResult.UNHANDLED_EXCEPTION) {
           // handle failure
        }
    }
}
