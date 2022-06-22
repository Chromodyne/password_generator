// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Begin my code.
//Use an object to store the user's desired preferences for password generation?

//User Preferences Constructor
function UserPreferences(length, lower, upper, numeric, special) {

  this.passLength = length;
  this.includeUpper = upper;
  this.includeNumeric = numeric;
  this.includeSpecial = special; 

}


generateBtn.addEventListener("click",);

function TakeUserInput() {

  UserPreferences(length)
}
