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
// ====================================== //
//Pseudo-code outline.
//1. Prompt the user for their desired preferences and then store them.
//Use an object to store the user's desired preferences for password generation?
//Constructor to build the object's properties.
//2. 


//User Preferences Constructor
function UserPreferences(length, lower, upper, numeric, special) {

  this.passLength = length;
  this.includeUpper = upper;
  this.includeNumeric = numeric;
  this.includeSpecial = special; 

}

generateBtn.addEventListener("click",TakeUserInput);

function TakeUserInput() {

  //Create a new object.
  let userPref = new UserPreferences();

  //Utilize prompts to 
  userPref.passLength = prompt("Please enter your desired password length (Between 8 & 128).");
  userPref.includeUpper = prompt("Would you like to include upper-case letters in your password?");
  userPref.includeNumeric = prompt("Would you like to include numbers in your password?");
  userPref.includeSpecial = prompt("Would you like to include special characters in your password?");

  console.log(userPref.passLength);

}

