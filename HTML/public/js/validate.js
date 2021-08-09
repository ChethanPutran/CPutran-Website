// Defining a function to display error message
function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

// Defining a function to validate form
function validateForm() {
  // Retrieving the values of form elements
  var fname = document.contactForm.fname.value;
  var lname = document.contactForm.lname.value;
  var email = document.contactForm.email.value;
  var mobile = document.contactForm.phone.value;
  var password = document.contactForm.password.value;
  var cpassword = document.contactForm.confirmpassword.value;
  var age = document.contactForm.age.value;
  var country = document.contactForm.country.value;
  var gender = document.contactForm.gender.value;

  var role = document.contactForm.role.value;

  var passErr = true;

  if (password != cpassword) {
    printError("passErr", "Passwords should match");
  } else {
    printError("passErr", "");
    passErr = false;
  }

  if (password == "") {
    printError("passErr", "Please enter password");
  } else {
    var regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;
    if (regex.test(password) === false) {
      alert(
        <div id="message">
          <h3>Password must contain the following:</h3>
          <ul>
            <li>
              A <b>lowercase </b> letter (a-z)
            </li>
            <li>
              A <b>capital (uppercase)</b> letter (A-Z)
            </li>
            <li>
              A <b>number</b> (0-9)
            </li>
            <li>
              A <b>special character</b> (!@#$%^&*_)
            </li>
            <li>
              Minimum <b>8 characters</b> and maximum <b>16 characters</b>
            </li>
          </ul>
        </div>
      );
    } else {
      printError("passErr", "");
      passErr = false;
    }
  }

  if (passErr == true) {
    return false;
  } else {
    // Creating a string from input data for preview
    var dataPreview =
      " You have entered the following details: " +
      "\n" +
      "First Name: " +
      fname +
      "\n" +
      "Last Name: " +
      lname +
      "\n" +
      "Email Address: " +
      email +
      "\n" +
      "Mobile Number: " +
      mobile +
      "\n" +
      "Country: " +
      country +
      "\n" +
      "Gender: " +
      gender +
      "\n" +
      "Age: " +
      age +
      "\n" +
      "Role: " +
      role +
      "\n";
    alert(dataPreview);

    //   if (hobbies.length) {
    //     dataPreview += "Hobbies: " + hobbies.join(", ");
    //   }
    //   // Display input data in a dialog box before submitting the form
    //   alert(dataPreview);
  }
}
