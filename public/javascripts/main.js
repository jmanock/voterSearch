$(document).ready(function(){
  $('#loader').hide();
  $('#search').on('keyup', function(e){
    var search = $(this).val();
    var split = search.split(' ');
console.log(search);
    if(e.keyCode === 13 && search !== ' '){
      // Need to check that something is there
      e.preventDefault();

      $('.res').empty();
      $('#loader').show();

      // var search = $(this).val();
      // var split = search.split(' ');
      // if(search === ' '){
      //   console.log('Nothing is there stupid');
      // }
      if(split.length !== 2){
        console.log('this should get rejected');
      }
      var firstName = split[0].toUpperCase();
      var lastName = split[1].toUpperCase();

      var params = {
        firstName:firstName,
        lastName:lastName
      };

      $.get('/search', params, function(data){
        if(data instanceof Array){
          $('#loader').hide();
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
            var urlAdd = data[i].Url;
            if(add2 !== undefined){
              $('thead').append(
                '<tr class="res">'
                +'<td>'+fullName+'</td>'
                +'<td>'+gender+'</td>'
                +'<td>'+age+'</td>'
                +'<td><a target="_blank" href='+urlAdd+'>'+address+'</a></td>'
                +'<td>'+add2+'</td>'
                +'<td>'+city+'</td>'
                +'<td>'+zip+'</td>'
              );
            }else{
              $('thead').append(
                '<tr class="res">'
                +'<td>'+fullName+'</td>'
                +'<td>'+gender+'</td>'
                +'<td>'+age+'</td>'
                +'<td><a target="_blank" href='+urlAdd+'>'+address+'</a></td>'
                +'<td></td>'
                +'<td>'+city+'</td>'
                +'<td>'+zip+'</td>'
              );
            }

          }
        }else{
          console.log('Nothing to see here?');
        }
      }); // End Search
      e.currentTarget.value = '';
    }

  });
});
