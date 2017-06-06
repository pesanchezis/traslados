var firebase = require('firebase');
var axios = require('axios');
const util = require('util');

var config = {
        apiKey: "AIzaSyBiBdm3MheV4sN7lfk0WLoVDtXXxHxbbvk",
        authDomain: "devnovators.firebaseapp.com",
        databaseURL: "https://devnovators.firebaseio.com",
        storageBucket: "devnovators.appspot.com",
      };
firebase.initializeApp(config);

/*function writeUserData(userId, projectId) {
  firebase.database().ref('/eventos/pi4/users/' + userId + '/' + projectId).set({
    comments: { message: " " },
    kudos: { calidad: false, innovacion: false, simplicidad: false, rentabilidad: false, eficiencia: false, esfuerzo: false }
  });
}*/
firebase.database().ref('/eventos/comiteCT/users').once('value').then(function(snapshot) {
  var users = snapshot.val();
  console.log('user;project;kudo;rating;feedback');
  for (var user in users) { //recorremos todos los users
    for (var project in users[user]) { //recorremos los projects del user actual
      if (project == 'profile') {}
      else {
        var kudo = '';
        var rating = 0;
        var feedback = '';
        var actions = users[user][project];
        for (var action in actions) {
          if (action == 'comments') {
            for (var nodo in users[user][project][action]) {
              if (nodo == 'message') {
                var message = users[user][project][action][nodo];
                if (message != ' ' && message != '.') {
                  feedback = message;
                }
              }
            }
          } else if (action == 'rating') {
            var rating = users[user][project]['rating'];
          } else if (action == 'kudos') {
            var kudos = users[user][project]['kudos'];
            if (kudos.calidad == true) { kudo = 'Discuss'; }
            if (kudos.innovador == true) { kudo = 'I agree'; }
          }
        }
        console.log(user + ';' + project + ";" + kudo + ";" + rating + ";" + feedback);
      }
    };
  };
});
/*firebase.database().ref('/eventos/comiteCT/users').once('value').then(function(snapshot) {
  var pid = 'B1C01';
  console.log(pid);
  var users = snapshot.val();
  var stars = 0;
  var calidad = 0; var esfuerzo = 0; var innovacion = 0; var rentabilidad = 0; var simplicidad = 0; var eficiencia = 0;
  for (var user in users) {
    for (var project in users[user]) {
      if (project == pid) {
        var feedback = '';
        var vote = users[user][project];
        for (var prop in vote) {
          if (prop == 'comments') {
            for (var commentProps in users[user][project][prop]) {
              if (commentProps == 'message') {
                var message = users[user][project][prop][commentProps];
                if (message != ' ' && message != '.') {
                  feedback = user + ' > ' + message;
                }
              }
            }
          } else if (prop == 'rating') {
            var rating = users[user][project]['rating'];
            stars = stars + rating;
          } else if (prop == 'kudos') {
            var kudos = users[user][project]['kudos'];
            if (kudos.calidad == true) { calidad++; }
            //if (kudos.esfuerzo == true) { esfuerzo++; }
            if (kudos.innovador == true) { innovacion++; }
            if (kudos.rentable == true) { rentabilidad++; }
            //if (kudos.simplicidad == true) { simplicidad++; }
            //if (kudos.eficiencia == true) { eficiencia++; }
          }
        }
        if (feedback != '') {
          console.log('feedback: '+ feedback);
        }
      }
    }
  }
  //console.log(' ');
  console.log('calidad: '+ calidad);
  //console.log('esfuerzo: '+ esfuerzo);
  console.log('innovacion: '+ innovacion);
  console.log('rentabilidad: '+ rentabilidad);
  //console.log('simplicidad: '+ simplicidad);
  //console.log('eficiencia: '+ eficiencia);
  console.log('estrellas: ' + stars);
});*/

//console.log('...');

