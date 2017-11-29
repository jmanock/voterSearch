$(document).ready(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      var search = $(this).val();
      var split = search.split(' ');

      var firstName = split[0].toUpperCase();
      var lastName = split[1].toUpperCase();

      var params = {
        firstName:firstName,
        lastName:lastName
      };

      $.get('/search', params, function(data){
        if(data instanceof Array){
          for(var i = 0; i<data.length; i++){
            if(data[i] === 'Address2'){
              console.log('Yes');
            }else{
              console.log('No');
            }
            // var fName = data.FirstName;
            // var lName = data.LastName;
            // var fullName = fName + ' '+ lName;
            // var age = data.Age;
            // var city = data.City;
            // var zip = data.Zip;
            // var address = data.Address;
            // var address2 = data.Address2;
            // var gender = data.Gender;
            // var birthday = data.Dob;
          }
        }
      });
      e.currentTarget.value = '';
    }

  })
});
