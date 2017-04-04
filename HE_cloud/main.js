/*  Params:
    - field : String, which column to sort the user list by
    - limit : int, how many results to return
*/

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define('GetUserLeaderboard', function(request,response) {
  // console.log(request.params.field);
  // console.log(request.params.limit);

  var query = new Parse.Query(Parse.User);
  query.descending(request.params.field);
  query.limit(request.params.limit);
  query.select('customUsername', 'costume', request.params.field);
  query.notEqualTo('developer', true);
  query.find({
    success:function(list) {
      var str = "";
      for (var i=0;i<list.length;i++) {
        var thisUser = list[i];
        var userName = thisUser.get('customUsername') != undefined? thisUser.get('customUsername') : "SP#RREV#P";
        var score = thisUser.get(request.params.field);
        var costume = thisUser.get('costume') != undefined? thisUser.get('costume') : '';
        if (score <= 0) continue; 
        str += ">" + i.toString() + "<" + userName + "<" + score.toString() + "<" + costume;
      }
      response.success(str);
    }
  });

});