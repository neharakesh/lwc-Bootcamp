public with sharing class task2 {
    public static void updateProperty(List<Property3__c> newList,Map<Id,Property3__c> oldMap){
        Set<Id> ListedUserId=new Set<Id>();
        
        for(Property3__c each_Prop:newList){
            if(oldMap == null){
    
            if(each_Prop.Listed_By__c != null){
                ListedUserId.add(each_Prop.Listed_By__c);
                }
            }
            else{
                Property3__c oldData=oldMap.get(each_Prop.Id);
                    if(each_Prop.Id==oldData.Id && each_Prop.Listed_By__c!=oldData.Listed_By__c){
                        ListedUserId.add(each_Prop.Listed_By__c);
                    }
                
                
            }
                
            
        }

        List<User> userList=[Select Id,Username,Regional_Office__c from User WHERE Id In:ListedUserId]; 
        Map<Id,	User> UserResult=new Map<Id,User>(userList);
        Set<Id> regionalOffice=new Set<Id>();
        for(User eachRegion:userList){
            if(eachRegion.Regional_Office__c!=null){
                regionalOffice.add(eachRegion.Regional_Office__c);
            }
        }

        List<Regional_Office__c> regionalOfficeList=[SELECT Id,Region__c FROM Regional_Office__c WHERE Id IN:regionalOffice];
        
        Map<Id,	Regional_Office__c> regionalOfficeResult=new Map<Id,Regional_Office__c>(regionalOfficeList);

        for(Property3__c eachProp:newList){
            User u=UserResult.get(eachProp.Listed_By__c);
            if(u!=null && u.Regional_Office__c!=null){
                eachProp.Regional_Office__c=u.Regional_Office__c;
                Regional_Office__c office=regionalOfficeResult.get(u.Regional_Office__c);
                eachProp.Region__c=office.Region__c;
            }
        }
        
    }
    


    public static void assignTask(List<Property3__c> newList){
        List<Task> taskList=new List<Task>();
        for(Property3__c eachProp:newList){
            if(eachProp.Listed_By__c!=null){
                Task tk1=new Task(
                    Subject='Capture Latest Property Photographs',
                Description='Description',
                ActivityDate=Date.Today().addDays(2),
                Status='Not Started',
                Priority='Low',
                OwnerId=eachProp.Listed_By__c
                );
            taskList.add(tk1);
            }
        }

        if(!taskList.isEmpty()){
            insert taskList;
        }
        
    }
}