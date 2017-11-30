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
        /* todo
          ~ style
          ~ clear results with new search
          ~ Make links?
        */
        if(data instanceof Array){
          for(var i = 0; i<data.length; i++){
            var add2 = data[i].Address2;
            var fName = data[i].FirstName;
            var lName = data[i].LastName;
            var fullName = fName + ' '+ lName;
            var address = data[i].Address;
            var city = data[i].City;
            var age = data[i].Age;
            var birthday = data[i].Dob;
            var city = data[i].City;
            var gender = data[i].Gender;
            var zip = data[i].Zip;
            if(add2 !== undefined){
              // console.log(fullName, address, add2, city, age, birthday, gender, zip);
              $('#results').append(fullName, address, add2, city, age, birthday, gender, zip);
            }else{
              //console.log(fullName, address, city, zip, age, birthday,gender);
              $('#results').append(fullName, address, city, age, birthday, gender, zip);
            }

          }
        }
      });
      e.currentTarget.value = '';
    }

  })
});
