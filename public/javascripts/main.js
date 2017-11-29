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
            var add2 = data[i].Address2;
            if(add2 !== undefined){
              // console.log('Yess');
              console.log(data[i]);
            }else{
              // console.log('No!');
            }
            var fName = data[i].fName;
          }
        }
      });
      e.currentTarget.value = '';
    }

  })
});
