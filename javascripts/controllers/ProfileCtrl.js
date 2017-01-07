"use strict";

app.controller("ProfileCtrl", function($scope, $rootScope, $location, $routeParams, AuthFactory, UserFactory, GoogleMapsFactory, ContactsFactory) {
$scope.myinfo = "";
$scope.editing = false;
$scope.newPhotoURL = "";

getUserDetails();

function getUserDetails () {
  UserFactory.getUserDetails($rootScope.user.uid).then(function(response) {
    $scope.myinfo = response;
  });
}

$scope.editUserDetails =function(editedUserInfo) {
  alertify.success("Profile updated.");
  UserFactory.editUser($rootScope.user.uid, $scope.myinfo.profile_photo, editedUserInfo).then(function(response) {
  getUserDetails();
  });
};

$scope.edit = function(){
  $scope.editing = !$scope.editing;
  getUserDetails();
};

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    let photoURL = e.target.result;
    $scope.newPhotoURL = photoURL;
    $('#editing-profile-image').attr('src', $scope.newPhotoURL);
}

$scope.savePhoto = function() {
    $('#profile-photo').attr('src', $scope.newPhotoURL);
    UserFactory.editUser($rootScope.user.uid, $scope.newPhotoURL, $scope.myinfo).then(function() {
      alertify.success("Profile image updated.");
    });
};



});
