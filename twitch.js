$(document).ready(function() {

    $("#statustable").hide();
    $("#searchtable").hide();

    var userarr = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "habathcx", "RobotCaleb", "noobs2ninjas", "frinlet"];


    //start of displaying codecamp status
    $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/freecodecamp", function(result) {
        if (result.stream == null) {
            $(".fccstatus").html("<a href='https://www.twitch.tv/freecodecamp' target='_blank'> Freecodecamp</a> is offline at the moment");
        } else {
            $(".fccstatus").html("<a href='https://www.twitch.tv/freecodecamp'>Freecodecamp</a> is streaming now");
        }
    });
    //end of displaying codecamp status

    //strat of displaying  all channels in array when loaded
    for (var i = 0; i < userarr.length; i++)
    // $.each(userarr,function(i,arr){   
    {
        (function(i) {
            url = 'https://wind-bow.glitch.me/twitch-api/channels/' + userarr[i];

            $.getJSON(url, function(result) {
                // console.log(result);
                $(".tablebody1").append("<tr><td><a target ='_blank' href='" + result.url + "'><img src='" + result.logo + "'></a></td><td>" + result.display_name + "</td><td>" + result.status + "</td></tr>");

            });
        })(i);
    }
    //end of  displaying  all channels in array when loaded

    //start of search field  output
    $("#search").on("click", function(event) {
        event.preventDefault();
        $("p").html("Table for searched channels")
        $("#searchtable").show();
        var searchval = $("#searchfield").val();
        console.log(searchval);
        var url4 = 'https://wind-bow.glitch.me/twitch-api/channels/' + searchval;
        console.log(url4);
        $.getJSON(url4, function(result) {
            console.log(result);
            // console.log(typeof(result.status)=="number");
            if (typeof(result.status) == "number") {
                $(".tablebody0").prepend("<tr><td></td><td>" + searchval + "</td><td>This channel doesn't exist.Please try another one.</td></tr>");

            } else {

                $(".tablebody0").prepend("<tr><td><a target ='_blank' href='" + result.url + "'><img alt=" + searchval + " src='" + result.logo + "'></a></td><td>" + result.display_name + "</td><td>" + result.status + "</td></tr>");
            }



        });
    });

    //end of  search field  output

    //code for online channels
    $("#online").on("click", function() {
        $("#statustable").show();
        for (var i = 0; i < 2; i++) {
            if (checkstatus(userarr[i]) == 1)
                console.log(userarr[i] + " is online");
            else if (checkstatus(userarr[i]) == 0)
                console.log(userarr[i] + " is offline")


        }
    });

    function checkstatus(channelname) {
        var url = "https://wind-bow.glitch.me/twitch-api/streams/" + channelname;
        var status;
        console.log("checkig status of " + channelname)
        $.getJSON(url, function(result) {
            if (result.stream == null) {
                status = 0;
                console.log(result._links)
            } else {
                status = 1;
            }
        });
        return status;
    }
});




/*       $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/"+userarr[i],function(result){

         if(result.stream==null){

 $(".tablebody1").append("<td>Offline</td></tr>");

         }    
         else{
              $(".tablebody1").append("<td>Online</td></tr>");
         }
    }); */

/*    ( function(i){
                  var urlnew="https://wind-bow.glitch.me/twitch-api/streams/"+ userarr[i];
// alert("user array now running is" + userarr[i]);
          $.getJSON(urlnew, function(result) {
                 console.log(result);
                if(result.stream==null){
                  // alert("the alert in offline is " + userarr[i]);
                  $("#statusbody").append("<tr> is  offline </tr>")
                  
                }
                 else{
                   // alert(userarr[i])
                   $("#statusbody").append("onlinr")
                 }
               });
           })(i);
       */