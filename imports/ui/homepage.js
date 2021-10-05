Template.homePage.onRendered(function() {
  Session.set('sub',true);
  Session.set('otp',false);
});
Template.homePage.events({
    'click #confirm-yes-button':function(event){
      $("#myModal").modal('hide');
    },
    'click #locsearchhome':function(event){
      event.preventDefault();
      var locs=$('#locsearching').val();
      console.log(locs);
      Session.set('homelocationfilter',locs);
    },
    'click #submit-button':function(event){
      event.preventDefault();
      var phoneauth=$("#phoneauth").val();
      console.log(phoneauth);
      if(isNotEmpty(phoneauth) &&
      isValidMobile(phoneauth)){
        Session.set('sub',false);
        Session.set('otp',true);
      }
    },
  });
  Template.homePage.helpers({
    otp:function(){
      return Session.get('otp');
    },
    sub:function(){
      return Session.get('sub');
    },
    searchfor:function(){
      if (Session.get("homelocationfilter")){
        return Drivers.findOne({Location:new RegExp(Session.get("homelocationfilter"),'i')}).Location;
      }
      else if(Session.get("homelocationfilter")){
        return Taxis.findOne({Location:new RegExp(Session.get("homelocationfilter"),'i')}).Location;
      }
      else{
        return false;
      }
    },
    countofdriver:function(){
      if (Session.get("homelocationfilter")){// they set a filter!
        return Drivers.find({Location:new RegExp(Session.get("homelocationfilter"),'i')}).count();
      }
    },
    countoftaxi:function(){
      if (Session.get("homelocationfilter")){// they set a filter!
        return Taxis.find({Location:new RegExp(Session.get("homelocationfilter"),'i')}).count();
      } 
    },
    searchdriver:function(){
      if (Session.get("homelocationfilter")){// they set a filter!
        return Drivers.find({Location:new RegExp(Session.get("homelocationfilter"),'i')}, {sort:{rating:-1}});
      }
    },
    searchtaxi:function(){
      if (Session.get("homelocationfilter")){// they set a filter!
        return Taxis.find({Location:new RegExp(Session.get("homelocationfilter"),'i')}, {sort:{rating:-1}});
      }
    }

  });

  var isNotEmpty= function(value){
    if (value && value !== '') {
        return true;
    }
    Bert.alert("Please fill Mobile Number", "danger", "growl-top-right");
    
    return false;
  };
  isValidMobile = function(Mobile_Number) {
    if(Mobile_Number.length !== 10) {
        Bert.alert("Invalid Mobile Number", "danger", "growl-top-right");
        return false;
    }
    return true;
  };
  