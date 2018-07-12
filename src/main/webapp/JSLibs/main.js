$(document).ready(function(){

    // Google Login
    $("#googleLogin").on("click", function(){
        $(window).attr("location", redirectURL());
    });

    var redirectURL = function(){
        var client_id = "920111247627-bttq3tqcgbpp4deuske0ae29h68tsi95.apps.googleusercontent.com";
        var callback_url = "https://setmoreinternship.appspot.com/OAuth2CallBack";
        var url = "https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=" + callback_url +"&response_type=code&client_id=" + client_id + "&approval_prompt=force";
        return url;
    }
});