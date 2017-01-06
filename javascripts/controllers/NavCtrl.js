"use strict";

app.controller("NavCtrl", ($scope) => {
  $scope.navItems = [
  {
    name:"Logout",
    url: "#/logout"
  },
  {
    name:"Map",
    url: "#/map"
  },
    {
    name:"myPlaces",
    url: "#/myplaces"
  },
    {
    name:"Contacts",
    url: "#/mycontacts"
  },
    {
    name:"Profile",
    url: "#/myprofile"
  }
  // ,
  // {
  //   name:"Add New Pin",
  //   url: '#/pins/new'
  // }
  ];
});