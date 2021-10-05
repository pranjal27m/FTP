Template.listing.onRendered(function() {
  $('#driver').css({"border":"2px solid black","border-radius":"3px"});
    Session.set("showdriver",true);
    Session.set("showtaxi",false);
  });
  Template.listing.events({
    'click #driver'(){
      Session.set("showtaxi",false);
      Session.set("showdriver",true);
    },
    'click #taxi'(){
      $('#driver').css({"border":"0px"});
      Session.set("showdriver",false);
      Session.set("showtaxi",true);
    },
    'click .demo':function(event){
      event.preventDefault();
      var ss=$('#searchloc').val();
      Session.set('locationfilter',ss);
    }
  });
  Template.listing.helpers({
    showtaxi :function(){
      return Session.get("showtaxi");
    },
    showdriver :function(){
     return Session.get("showdriver");
   },
    
   });
   Template.listingdriver.helpers({
     listingdriver:function(){
      if (Session.get("locationfilter")){// they set a filter!
        return Drivers.find({Location:new RegExp(Session.get("locationfilter"),'i')}, {sort:{createdOn: -1, rating:-1}});
      }
      else {
        return Drivers.find({}, {sort:{createdOn: -1, rating:-1}});
      }
     },
     sorteddriver:function(){
      if (Session.get("locationfilter")){// they set a filter!
        return Drivers.find({Location:new RegExp(Session.get("locationfilter"),'i')});
      }
      else{
        return false;
      }
     },
     
   });
   Template.listingdriver.events({
     'click .mystar':function(event){
      var rating =$(event.currentTarget).data("userrating");

      console.log(rating);
      var driver_id = this.id;
      var exicingrating =Drivers.findOne({_id:driver_id}).rating;
      console.log(exicingrating);
      if(exicingrating==0){
        var n=rating;
      }
      else {
        var currentrate=parseFloat((rating+exicingrating)/2);
      console.log(currentrate);
      var finalrating=currentrate.toFixed(1);
      console.log(finalrating);
     var n= parseFloat(finalrating);//not getting exact value of finalrating if this is not written 
      }
     
      Drivers.update({_id:driver_id},
        {$set:{rating:Number(n)}});
     }
   });
   Template.listingtaxi.helpers({
    listingtaxi:function(){
     if (Session.get("locationfilter")){// they set a filter!
       return Taxis.find({Location:new RegExp(Session.get("locationfilter"),'i')}, {sort:{createdOn: -1, rating:-1}});
     }
     else {
       return Taxis.find({}, {sort:{createdOn: -1, rating:-1}});
     }
    },
    sortedtaxi:function(){
      if (Session.get("locationfilter")){// they set a filter!
        return Taxis.find({Location:new RegExp(Session.get("locationfilter"),'i')});
      }
      else{
        return false;
      } 
     }
  });
  Template.listingtaxi.events({
    'click .mystar':function(event){
     var rating =$(event.currentTarget).data("userrating");
     var taxi_id = this.id;
     var exicingrating = Taxis.findOne({_id:taxi_id}).rating;
     var currentrate=(rating+exicingrating)/2;
     finalrating=currentrate.toFixed(1);
     n= parseFloat(finalrating);
     Taxis.update({_id:taxi_id},
       {$set:{rating:n}});
    }
  });
   