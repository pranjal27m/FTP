const { event } = require("jquery");

Template.settings.events({
    'click #editinfo'() {
      var num1=Session.get("UserId");
      var num2=Drivers.findOne({_id:num1});
      var num3=Taxis.findOne({_id:num1});
      Session.set('changepass',false);
      Session.set('adddriver',false);
      Session.set('addtaxi',false);
        if(num2){
        Session.set('drivertrue',true);
        }
        if(num3){
        Session.set('taxitrue',true);
        }
    },
    'click #adddrivers'(){
      Session.set('drivertrue',false);
      Session.set('taxitrue',false);
      Session.set("changepass",false);
      Session.set('adddriver',true);
    },
    'click #addtaxis'(){
      Session.set('drivertrue',false);
      Session.set('taxitrue',false);
      Session.set("changepass",false);
      Session.set('addtaxi',true);
    },
    'click #changepassword'() {
      Session.set('adddriver',false);
      Session.set('addtaxi',false);
      Session.set('drivertrue',false);
      Session.set('taxitrue',false);
      Session.set("clickme",true);
      Session.set("changepass",true);
      
    },
    "click #Logout" :function(event) {
      Session.set('UserId', null);
      console.log(Session.get('UserId'));
        //Bert.alert("Successfully Logout","success","growl-top-right");
    }
  });
Template.settings.helpers({
    drivertrue :function(){
      return Session.get("drivertrue");
    } ,
    taxitrue :function(){
      return Session.get("taxitrue")
    },
    DriverTrue:function(){
      var num1=Session.get("UserId");
      var num2=Drivers.findOne({_id:num1});
        if(num2){
          return true;
       }
    },
    TaxiTrue:function(){
      var num1=Session.get("UserId");
      var num3=Taxis.findOne({_id:num1});
        if(num3){
          return true;
       }
    },
    adddriver:function(){
     return Session.get("adddriver");
    },
    addtaxi:function(){
      return Session.get("addtaxi");
    },
    changepass:function() {
      return Session.get("changepass");
    },
    datacon :function(){
      var num1=Session.get("UserId");
      var num2=Drivers.findOne({_id:num1});
     
        if(num2){
          console.log(Drivers.find({_id:num1}));
          return Drivers.find({_id:num1});
        }
    },
    dataset :function(){
      var num1=Session.get("UserId");
      var num3=Taxis.findOne({_id:num1});
      if(num3){
        console.log(Taxis.find({_id:num1}));
        return Taxis.find({_id:num1});
      }
    }
  });
  Template.settingdriveredit.events({
   "submit .editdriver": function(event){
    event.preventDefault(); 
    var username = $("#uname").val();
    var Mobile_Number = $("#MobNumber").val();
    var Location =  $("#Loc").val();
    var drivinglicensenumber =  $("#drivinglnumber").val();
    var charges = $("#chargee").val();
    var num1=Session.get("UserId");

       if(isNotEmpty(username) &&
       isNotEmpty(Mobile_Number) &&
       isNotEmpty(Location) &&
       isNotEmpty(drivinglicensenumber)&&
       isNotEmpty(charges)&&
       isValidMobile(Mobile_Number)){
       Drivers.update({_id:num1},
        {$set:{
        username:username,
         Mobile_Number:Mobile_Number,
         Location:Location,
         drivinglicensenumber:drivinglicensenumber,
         charges:charges,
         createdOn: new Date(), 
       }});
       Bert.alert("successfully updated information","success","growl-top-right");
      }
    
    return false;
   }
  });
  Template.settingtaxiedit.events({
    'submit .edittaxi':function(event){
      event.preventDefault();
     var username = $("#uname1").val();
     var Mobile_Number = $("#MobNumber1").val();
     var Location =  $("#Loc1").val();
     var taxinumber =  $("#tnumber").val();
     var taximodal =  $("#tmodal").val();
     var charges = $("#chargee1").val();
     var num1=Session.get("UserId");
        
      if(isNotEmpty(username) &&
      isNotEmpty(Mobile_Number) &&
      isNotEmpty(Location) &&
      isNotEmpty(taxinumber) &&
      isNotEmpty(taximodal)  &&
      isNotEmpty(charges)&&
      isValidMobile(Mobile_Number) ){
     
        Taxis.update({_id:num1},
         {$set:{
          username:username,
          Mobile_Number:Mobile_Number,
          Location:Location,
          taxinumber:taxinumber,
          taximodal:taximodal,
          charges:charges,
          createdOn: new Date(), 
        }})
        Bert.alert("successfully updated information","success","growl-top-right");
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
   isValidMobile = function(Mobile_Number) {
    if(Mobile_Number.length !== 10) {
        Bert.alert("Invalid Mobile Number", "danger", "growl-top-right");
        return false;
    }
    return true;
  };
  Template.settingadddriver.events({
   'submit .adddriver': function(event) {
     event.preventDefault();
     console.log("submit driver clicked");
     var Location =  $("#LocA").val();
     var drivinglicensenumber =  $("#drivinglnumberA").val();
     var charges = $("#chargeeA").val();

     var _id=Session.get('UserId');
     var taxi=Taxis.findOne({_id:_id});

     var username=taxi.username;
     var Mobile_Number=taxi.Mobile_Number;
     var password=taxi.password;
     if( isNotEmpty(Location) &&
     isNotEmpty(drivinglicensenumber)&&
     isNotEmpty(charges)){
       if(Drivers.findOne({Mobile_Number:Mobile_Number})){
         Bert.alert("Mobile Number already registered","danger","growl-top-right");
         return false;
       }
       else{
         Drivers.insert({
           _id:_id,
           username:username,
           Mobile_Number:Mobile_Number,
           Location:Location,
           drivinglicensenumber:drivinglicensenumber,
           password:password,
           charges:charges,
           rating:0,
           createdOn:new Date(),
         });
         console.log("driver in");
         Bert.alert("Successfully created driver account","success","growl-top-right");
         event.target.reset();
       }
     }
     return false;
   }
  });
  Template.settingaddtaxi.events({
    'submit .addtaxi': function(event) {
      event.preventDefault();
      console.log("submit taxi clicked");
      var Location =  $("#Loc1A").val();
      var taximodal =  $("#tmodalA").val();
      var taxinumber =  $("#tnumberA").val();
      var charges = $("#chargee1A").val();
      console.log('Location:'+Location+" "+
      "modal:"+taximodal+" "+
      "number :"+taxinumber+" "+
      "charges :"+charges);
      var _id=Session.get('UserId');
      var driver=Drivers.findOne({_id:_id});
 
      var username=driver.username;
      var Mobile_Number=driver.Mobile_Number;
      var password=driver.password;
      if( isNotEmpty(Location) &&
      isNotEmpty(taximodal) &&
      isNotEmpty(taxinumber) &&
      isNotEmpty(charges)){
        if(Taxis.findOne({Mobile_Number:Mobile_Number})){
          Bert.alert("Mobile Number already registered","danger","growl-top-right");
          return false;
        }
        else{
          Taxis.insert({
            _id:_id,
            username:username,
            Mobile_Number:Mobile_Number,
            Location:Location,
            taximodal:taximodal,
            taxinumber:taxinumber,
            password:password,
            charges:charges,
            rating:0,
            createdOn:new Date(),
          });
          console.log("taxi in");
          Bert.alert("Successfully created taxi account","success","growl-top-right");
          event.target.reset();
        }
      }
      return false;
    }
   });
  Template.ChangePassword.events({
    'click #check'() {
      
      var oldpassword=$("#oldpass").val();
      console.log(oldpassword);
      if(CheckPassword (oldpassword)){
        var num1=Session.get("UserId");
        console.log(num1);
        var num2=Drivers.findOne({_id:num1});
        var num3=Taxis.findOne({_id:num1});
        if(num2 || num3){
          if(num2){
            console.log(num2);
            if(oldpassword==num2.password){
              Bert.alert("Password Matched","success","growl-top-right");
              Session.set('oldpass',true);
              Session.set("clickme",false);
            }
            else{
              Bert.alert("Password does not Matched","danger","growl-top-right");
            }
          }
          else if(num3){
            console.log(num3);
            if(oldpassword==num3.password){
              Bert.alert("Password Matched","success","growl-top-right");
              Session.set('oldpass',true);
              Session.set("clickme",false);
            }
            else{
              Bert.alert("Password does not Matched","danger","growl-top-right");
            }
          }
         
        }
        else{
          Bert.alert("Invalid Userrrr","danger","growl-top-right"); 
        } 
        
      }
      
      
    }
  });
  Template.NewPassword.events({
    'click #submit':function(event){
      var num1=Session.get("UserId");
      var num2=Drivers.findOne({_id:num1});
      var num3=Taxis.findOne({_id:num1});
      var newpassword=$("#newpass").val();
      var confirmpassword=$("#confpass").val();
      if(areValidPasswords(newpassword,confirmpassword)){
        if(num2 || num3){
          if(num2){
            Drivers.update({_id:num1},
              {$set:{password:newpassword}});
              Bert.alert("Password updated successfully","success","growl-top-right");
              event.target.reset();

          }
          else if(num3){
            Taxis.update({_id:num1},
              {$set:{password:newpassword}});
              Bert.alert("Password updated successfully","success","growl-top-right");
              event.target.reset();
          }
          
        }
        if(num2 && num3){
          Drivers.update({_id:num1},
            {$set:{password:newpassword}});
          Taxis.update({_id:num1},
              {$set:{password:newpassword}});
        }
      }
    }
  })
  Template.ChangePassword.helpers({
    oldpass: function(){
      console.log(Session.get("oldpass"));
      return Session.get("oldpass");
    },
    clickbut: function(){
      return Session.get("clickme");
    }
  });
 