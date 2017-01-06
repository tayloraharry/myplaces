"use strict";

app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG) {

  let addUser = (authData) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`,
        JSON.stringify({
          uid: authData.uid,
          username: authData.username,
          profile_photo: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj39aeeoJzRAhUp0oMKHbVoC_IQjRwIBw&url=http%3A%2F%2Fwww.techrepublic.com%2Farticle%2Fpro-tip-manage-wi-fi-with-terminal-commands-on-os-x%2F&psig=AFQjCNFUx1Vvnbp3kd_ShTXIXlOkywat1A&ust=1483198797727827"
        })
      )
      .success(function(storedUserSuccess){
        resolve(storedUserSuccess);
      })
      .error(function(storedUserFailure){
        reject(storedUserFailure);
      });
    });
  };

  let getUser = (userId) => {
    return $q((resolve, reject) => {
    $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(userObject){
        let users = [];
        Object.keys(userObject).forEach(function(key) {
          users.push(userObject[key]);
        });
        resolve(users[0]);
      })
      .error(function(error){
        reject(error);
      });
    });
  };

  let getUserDetails = (userId) => {
    return $q((resolve, reject) => {
    $http.get(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`)
      .success(function(userObject){
        resolve(userObject);
      })
      .error(function(error){
        reject(error);
      });
    });
  };

  var editUser = function(editedUserId, photoURL, editUserInfo){
    return $q((resolve, reject)=> {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/users/${editedUserId}.json`, JSON.stringify({
         uid: editedUserId,
         firstname: editUserInfo.firstname,
         lastname: editUserInfo.lastname,
         phonenumber: editUserInfo.phonenumber,
         email: editUserInfo.email,
         profile_photo: photoURL
        })
      ).success(function(editResponse) {
        resolve(editResponse);
      }).error(function(editError) {
        reject(editError);
      });
    });
  };


  return {
            addUser:addUser,
            getUser:getUser,
            getUserDetails:getUserDetails,
            editUser:editUser

          };
});