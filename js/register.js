$(document).ready(function() {
	//$("#register_form").on("submit", Validation);
	$("#register_form").submit(validation);
	$('#tx_password').change(function(){
		check_pw_strength($('#tx_password').val());
	});
});

var clean = function(){
	$('#login_username_errorloc').text("");
	$('#login_email_errorloc').text("");
	$('#login_password_errorloc').text("");
	$('#login_passwordck_errorloc').text("");
}

var validation = function() {

	clean();

	var username = $('#tx_name').val();
	var email = $('#tx_email').val();
	var password = $('#tx_password').val();
	var re_password = $('#tx_password_chk').val();
	
	if(username.length == 0)
	{
		$('#login_username_errorloc').text("Please enter Name!");
		return false;
	}
	
	if(email.length == 0)
	{
		$('#login_email_errorloc').text("Please enter Email!");
		return false;
	}
	else
	{
		if(!validateEmail(email))
		{
			$('#login_email_errorloc').text("Please check your Email is correct or not");
			return false;
		}
		else
		{
			if(check_email(email) > 0)
			{
				$('#login_email_errorloc').text("Oops, someone else has already used this email. Please change to another one");
				return false;				
			}
		}
	}
	
	if(password.length == 0)
	{
		$('#login_password_errorloc').text("Please enter password!");
		return false;
	}
	else
	{
		var pw_strength = check_pw_strength($('#tx_password').val());
		if( pw_strength == "")
		{
			if(re_password.length == 0)
			{
				$('#login_passwordck_errorloc').text("Please enter second password to check!");
				return false;
			}
			
			if(password.length > 0 && re_password.length > 0 && password != re_password )
			{
				$('#login_passwordck_errorloc').text("These two passwords should match");
				return false;
			}
		}
		else
		{
			$('#login_password_errorloc').text(pw_strength);
			return false;
		}
	}
	return true;
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var check_email = function () {
    return $.ajax({
        type: "POST",
        url: "add_user.php?email="+$('#tx_email').val(),
        async: false
    }).responseText;
}