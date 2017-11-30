$(document).ready(function(){
  $('#loader').hide();
  $('#search').on('keyup', function(e){
    e.preventDefault();
    var search = $(this).val();
    var trim = search.trim();
    var split = trim.split(' ');

    if(e.keyCode === 13 && search.length > 0){
      if(split.length !== 2){
        // This needs to be an error message
        alert('First and Last Names Only');
      }else{
        $('.res').empty();
        $('#loader').show();

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
              var gender = data[i].Gender;
              var zip = data[i].Zip;
              var urlAdd = data[i].Url;
              var urlKname = 'https://www.google.com/search?q='+fName+'+'+lName+'+'+zip;

              if(add2 !== undefined){
                $('thead').append(
                  '<tr class="res">'
                  +'<td><a target="_blank" href='+urlKname+'>'+fullName+'</a></td>'
                  +'<td>'+gender+'</td>'
                  +'<td>'+age+'</td>'
                  +'<td><a target="_blank"<a href='+urlAdd+'>'+address+'</a></td>'
                  +'<td>'+add2+'</td>'
                  +'<td>'+city+'</td>'
                  +'<td>'+zip+'</td>'
                );
              }else{
                $('thead').append(
                  '<tr class="res">'
                  +'<td><a target="_blank" href='+urlKname+'>'+fullName+'</a></td>'
                  +'<td>'+gender+'</td>'
                  +'<td>'+age+'</td>'
                  +'<td><a target="_blank"<a href='+urlAdd+'>'+address+'</a></td>'
                  +'<td>'+'</td>'
                  +'<td>'+city+'</td>'
                  +'<td>'+zip+'</td>'
                );
              }// End `Add2`
            }// End `For loop`
          }
        });// End `Search`

      }// End `Split`
      e.currentTarget.value = ' ';
    }// End `Keycode`
  });// End `Keyup`
});// End `Document`
