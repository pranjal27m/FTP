Template.signuppage.events({
  'click #confirm-yes-button':function(event){
    event.preventDefault();
    var logmobile = $("#logmobile").val();
    var logpassword =$("#logpassword").val();
    if( isValidMobile(logmobile) && CheckPassword (logpassword) ) {
      
         var num1 =Drivers.findOne({Mobile_Number:logmobile});
         var num2= Taxis.findOne({Mobile_Number:logmobile});

        if(num1 || num2){
          console.log("helloo");
           if(num1){
             console.log(num1);
             if(logpassword == num1.password) {
               console.log(logpassword);
               Router.go('settings',{_id:num1._id}); 
               $("#myModalsignup").modal('hide');
             }
             else{
              Bert.alert("Password is Incorrect","danger","growl-top-right");
            }
            
           }
      
         else if(num2){
           console.log(num2);
           
           if(logpassword == num2.password) {
             console.log(logpassword);
            
             Router.go('settings',{_id:num2._id});
             $("#myModalsignup").modal('hide');
           }
           else{
            Bert.alert("Password is Incorrect","danger","growl-top-right");
           }
         }
         else{
           Bert.alert("Invalid Mobile Number","danger","growl-top-right");
         }
        }
        else{
          Bert.alert("mobile number is not found in database","danger","growl-top-right");
        }
       
    }
   
    
  }


});
Template.signupdriver.events({ 
   
    "submit .submitdriver": function(event){
        event.preventDefault();
       
        var username = $("#username").val();
        var Mobile_Number = $("#Mobile_Number").val();
        var Location =  $("#Location").val();
        var drivinglicensenumber =  $("#drivinglicensenumber").val();
        var password = $("#password").val();
        var password2 = $("#password2").val();
        var charges = $("#charges").val();
        var rating ='0' ;


        if(isNotEmpty(username) &&
        isNotEmpty(Mobile_Number) &&
        isNotEmpty(Location) &&
        isNotEmpty(drivinglicensenumber) &&
        isNotEmpty(password) &&
        isNotEmpty(password2) &&
        isNotEmpty(charges)&&
        isValidMobile(Mobile_Number)&&
        CheckPassword (password)&&
        areValidPasswords(password,password2)) {
            //do stuff
           Drivers.insert({
             username:username,
             Mobile_Number:Mobile_Number,
             Location:Location,
             drivinglicensenumber:drivinglicensenumber,
             password:password,
             charges:charges,
             createdOn: new Date(),
             rating :rating,
           });
           Bert.alert("successfully open","success","growl-top-right");
           event.target.reset();
           return false;
        }
        return false;
    }
  });

  Template.signuptaxi.events({ 
   
    "submit .submittaxi": function(event){
        event.preventDefault();
       
        var username = $("#username1").val();
        var Mobile_Number = $("#Mobile_Number1").val();
        var Location =  $("#Location1").val();
        var taxinumber =  $("#taxinumber").val();
        var taximodal =  $("#taximodal").val();
        var password = $("#password1").val();
        var password2 = $("#password3").val();
        var charges = $("#charges1").val();
        var rating ='0' ;
        if(isNotEmpty(username) &&
        isNotEmpty(Mobile_Number) &&
        isNotEmpty(Location) &&
        isNotEmpty(taxinumber) &&
        isNotEmpty(taximodal) &&
        isNotEmpty(password) &&
        isNotEmpty(password2) &&
        isNotEmpty(charges)&&
        isValidMobile(Mobile_Number)&&
        CheckPassword (password)&&
        areValidPasswords(password,password2)) {
            //do stuff
            Taxis.insert({
              username:username,
              Mobile_Number:Mobile_Number,
              Location:Location,
              taxinumber:taxinumber,
              taximodal:taximodal,
              password:password,
              charges:charges,
              createdOn: new Date(),
              rating :rating,
            });

           Bert.alert("successfully open","success","growl-top-right");
           event.target.reset();
        }
        return false;
    }
  });
  
 
  
  var isNotEmpty= function(value){
    if (value && value !== '') {
        return true;
    }
    Bert.alert("Please fill in all fields", "danger", "growl-top-right");
    
    return false;
  };
  
  //check password field
  isValidPassword = function(password) {
    if(password.length <6) {
        Bert.alert("Password must be at least 6 characters", "danger", "growl-top-right");
        return false;
    }
    return true;
  };
  
  //Match Password
  areValidPasswords = function(password, confirm) {
    if(!isValidPassword(password)) {
        return false;
    }
    if(password !== confirm) {
        Bert.alert("Passwords do not match","danger","growl-top-right");
        return false;
    }
    return true;
  };
  isValidMobile = function(Mobile_Number) {
    if(Mobile_Number.length !== 10) {
        Bert.alert("Invalid Mobile Number", "danger", "growl-top-right");
        return false;
    }
    return true;
  };

  CheckPassword =function (password) 
  { 
  var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if(password.match(paswd)) 
  { 
    return true;
  }
  else
  { 
    Bert.alert("Password must contain at least one special character and Number", "danger", "growl-top-right");
  return false;
  }
  }  