import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import 'bootstrap/dist/css/bootstrap.css';
import './main.html';
import './main.css';
import '../imports/ui/navbar.html';
import '../imports/ui/listingtaxi.html';
import '../imports/ui/listingdriver.html';
import './signupPage.html';
import './setting.html';
import './signup.js';
import './settingsidebar.js';
import '../imports/ui/listing.js';
import '../imports/ui/homepage.html';
import '../imports/api/collections.js';
import '../imports/ui/homepage.js';
import { data } from 'jquery';
import { _ } from 'core-js';
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/',function() {
    this.render('navbar', {
        to:"navbar"
      });
      this.render('homePage', {
        to:"main"
      }); 
},{
  name:'homepage',
}
);
Router.route('/listing',function() {
    this.render('navbar', {
        to:"navbar"
      });
      this.render('listing', {
        to:"main"
      }); 
},{
  name:'list'
});
Router.route('/business',function() {
  this.render('navbar', {
      to:"navbar"
    });
    this.render('signuppage', {
      to:"main"
    }); 
});
Router.route('/business/settings/:_id',function() {
  this.render('settings', {
      to:"main"
    }); 
},{
name:'settings',
data:function(){
  var _id=this.params._id;
  console.log(_id);
  Session.set("UserId",_id);
}});










