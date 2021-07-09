MemberCollection role = new MemberCollection();
if(Context.Current.EnterStep.NodeName== "Applicant 申請人")
{
    try{  
         role = Role.FromFullName(OU.TryGetOUFromCode(FormDataSet["MIS02_Main.InitiatorOUCode"].ToString()).FullName+"/SecUnitHead 副主管").Members;
         string roleAccount = role[0].UserAccount;
         // 若申請人為副主管，跳過本節點
         if(roleAccount == Context.Current.Task.Owner.ToString())
             return null;
         else
             return role;
    }
    catch
    {
         return null; 
    }
}
else{
     try{
          role = Role.FromFullName(Context.Current.EnterStep.Owner.ParentOU.ParentOU.FullName+"/SecUnitHead 副主管").Members;
          // 前後主管為同一人，跳過本節點
          if(role[0].UserAccount == Context.Current.EnterStep.Owner.ToString())           
               return  null;
          else
              return role;
     }
     catch
    {
         return null; 
    }
}