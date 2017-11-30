$(document).ready(function(){
  $('#search').on('keyup', function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      $('#results').empty();
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
          ~ add spinner or new page

          ~ Make links?
          ~ iFrame, new page for results?
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
              $('#results').append(fullName, address, add2, city, age, birthday, gender, zip);
              // $('#results').append(
              //   '<thead>'+'<tr>'
              //   +'<th class="fullName">NAME</th>'
              //   +'<th class="gender">GENDER</th>'
              //   +'<th class="age">AGE</th>'
              //   +'<th class="address">ADDRESS</th>'
              //   +'<th class="add2">APT/UNIT</th>'
              //   +'<th class="city">CITY</th>'
              //   +'<th class="zip">ZIP</th>'
              // );
              // $('thead').append(
              //   '<tr>'
              //   +'<td>'+fullName+'</td>'
              //   +'<td>'+gender+'</td>'
              //   +'<td>'+age+'</td>'
              //   +'<td>'+address+'</td>'
              //   +'<td>'+add2+'</td>'
              //   +'<td>'+city+'</td>'
              //   +'<td>'+zip+'</td>'
              // );
            }else{
              $('#results').append(fullName, address, city, age, birthday, gender, zip);
              // $('#results').append(
              //   '<thead>'+'<tr>'
              //   +'<th class="fullName">NAME</th>'
              //   +'<th class="gender">GENDER</th>'
              //   +'<th class="age">AGE</th>'
              //   +'<th class="address">ADDRESS</th>'
              //   +'<th class="city">CITY</th>'
              //   +'<th class="zip">ZIP</th>'
              // );
              // $('thead').append(
              //   '<tr>'
              //   +'<td>'+fullName+'</td>'
              //   +'<td>'+gender+'</td>'
              //   +'<td>'+age+'</td>'
              //   +'<td>'+address+'</td>'
              //   +'<td>'+city+'</td>'
              //   +'<td>'+zip+'</td>'
              // );
            }

          }
        }
      });
      e.currentTarget.value = '';
    }

  })
});
