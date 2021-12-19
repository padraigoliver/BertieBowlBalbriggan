// Services Page Content Below
// jQuery function to maximise & minimise accordion content

$(document).ready(function(){
	$(".item-header").click(function(){
		if($(this).children(".icon").text()=="+"){
			$(".accordion-item").removeClass("active");
			$(this).parent().addClass("active");
			$(".icon").text("+");
			$(this).children(".icon").text("-");
		}
		else if($(this).children(".icon").text()=="-"){
			$(".accordion-item").removeClass("active");
			$(this).children(".icon").text("+");
		}
	});
});

/* Gallery Page Content Below - jQuery Slider that loops through images */

$(document).ready(function(){
    $('.next').on('click', function(){
        var currentImg = $('.active');
        var nextImg = currentImg.next();

        if(nextImg.length){
            currentImg.removeClass('active').css('z-index', -1);
            nextImg.addClass('active').css('z-index',10);
        }
        else{
            currentImg.removeClass('active').css('z-index', -1);
            $('#first').addClass('active').css('z-index',1);
        }
    });

    $('.prev').on('click', function(){
        var currentImg = $('.active');
        var prevImg = currentImg.prev();

        if(prevImg.length){
            currentImg.removeClass('active').css('z-index', -1);
            prevImg.addClass('active').css('z-index',1);
        }
        else{
            currentImg.removeClass('active').css('z-index', -1);
            $('#last').addClass('active').css('z-index',1);
        }
    });
});

/* Booking Page Content Below */
/* Javascript methods to validate Booking form */

if(document.getElementById('booking')) {

    const form = document.getElementById('form');
    const fName = document.getElementById('fName');
    const lName = document.getElementById('lName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const date = document.getElementById('date');
    const no_adult = document.getElementById('no_adult');
    const no_minor = document.getElementById('no_minor');
    const no_games = document.getElementById('no_games');

    let fNameError=false;
    let lNameError=false;
    let emailError=false;
    let phoneError=false;
    let dateError=false;
    let pplPerBookingError=false;  

    form.addEventListener('submit', (e)=>{
        checkInput();
        if(fNameError | lNameError | emailError | phoneError | dateError | pplPerBookingError){
            e.preventDefault(); 
            alert("Booking unsuccessful for the reason(s) highlighted in red.\nPlease try again.");
        }
        else{
            document.getElementById('form').style.display = "none";
            confirm();
            e.preventDefault(); 
        }
    });

    function checkInput(){
        const fNameValue = fName.value.trim();
        const lNameValue = lName.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const dateValue = date.value.trim();
        const noAdultValue = parseInt(no_adult.value);
        const noMinorValue = parseInt(no_minor.value);
        const pplPerBooking = noAdultValue + noMinorValue;
        
        // A valid name consists of only alphabetic characters or spaces
        // A valid phone number consists of only numeric digits and spaces
        const validName = /^[a-zA-Z ]+$/;
        const validPhone= /^[0-9 ]+$/;

        // First Name Validation Checks
        if(!validName.test(fNameValue)){
            setErrorFor(fName,'A name can only consist of alphabetic characters or spaces');
            fNameError=true;
        }
        else if(fNameValue.length > 20){
            setErrorFor(fName,'A name can be no longer than 20 characters');
            fNameError=true;
        }
        else{
            setSuccessFor(fName);
            fNameError=false;
        }

        // Last Name Validation Checks
        if(!validName.test(lNameValue)){
            setErrorFor(lName,'A name can only consist of alphabetic characters and spaces');
            lNameError=true;
        }
        else if(lNameValue.length > 20){
            setErrorFor(lName,'A name can be no longer than 20 characters');
            lNameError=true;
        }
        else{
            setSuccessFor(lName);
            lNameError=false;
        }

        // Email Validation Checks
        if(emailValue.substring(emailValue.lastIndexOf(".")) !== ".com" & emailValue.substring(emailValue.lastIndexOf(".")) !== ".ie"){
            setErrorFor(email,'Your email provided must contain a \"\.com\" or \"\.ie\" domain');
            emailError=true;
        }
        else if(emailValue.length > 30){
            setErrorFor(email,'Your email provided can be no longer than 30 characters');
            emailError=true;
        }
        else{
            setSuccessFor(email);
            emailError=false;
        }

        // Phone Validation Checks
        if(!validPhone.test(phoneValue)){
            setErrorFor(phone,'A phone number can only consist of numeric digits and spaces');
            phoneError=true;
        }
        else if(phoneValue.length > 15){
            setErrorFor(phone,'Your phone number provided can be no longer than 15 digits');
            phoneError=true;
        }
        else{
            setSuccessFor(phone);
            phoneError=false;
        }

        // Booking Date/Time Validation Checks
        if(dateValue===''){
            setErrorFor(date,'The booking period cannot be blank');
            dateError=true;
        }
        else{
            setSuccessFor(date);
            dateError=false;
        }

        // Check not more than 6 people per booking - max 6 per bowling lane
        if(pplPerBooking > 6){
            pplPerBookingError=true;
            setErrorFor(no_adult,"You cannot have more than 6 people per booking");
            setErrorFor(no_minor,"You cannot have more than 6 people per booking");
        }
        else
        {
            pplPerBookingError=false;
        }
    }

    /* javascript methods to (1) send error messages to <small> tag when Booking form field not completed correctly & change class name to 'error' so field has red outline (2) change class name to success where form field is completed correctly so field has green outline */

    function setErrorFor(input, message){
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.innerText=message;
        formControl.className = 'form-control error';
    }

    function setSuccessFor(input, message){
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function confirm(){
        document.getElementById("confirmation").innerHTML="<br>Booking complete!<br><br>A confirmation email has been sent to "+email.value+"<br><br>You will now be redirected back to the Home page<br><br>";
        setTimeout(function(){
            window.location.href = '../index.html';
        }, 7000);
    }

    /* Customizations made to jQuery DateTimePicker Plugin so:
    - Doesn't default to current date so placeholder can still be seen
    - Prevents past dates from being selected
    - Closes expanded view once date & time have been picked
    - Date format set to more familiar DDMMYY
    - Monday set to appear as 1st day in calendar
    - Earliest time selection available set to 9am
    - Latest time selection available set to 9pm as doors close at 11pm! */

    $(function(){
        $('*[name=date]').appendDtpicker({
                autodateOnStart:false,
                futureOnly:true,
                closeOnSelected:true,
                dateFormat:"DD.MM.YY H:mmTT",
                firstDayOfWeek:1,
                minTime:"09:00",
                maxTime:"21:01"
        });
    });
}