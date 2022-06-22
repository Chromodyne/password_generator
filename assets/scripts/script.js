// Assignment Code
var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// // Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);

//Begin my code.
// ====================================== //
//Pseudo-code outline.
//1. Prompt the user for their desired preferences and then store them.
//Use an object to store the user's desired preferences for password generation?
//Constructor to build the object's properties.
//2. 


//This will be a multi-dimensional array of possible characters.
let upperChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

let userPref = new UserPreferences();

//User Preferences Constructor
function UserPreferences(length, lower, upper, numeric, special) {

  this.passLength = length;
  this.includeUpper = upper;
  this.includeNumeric = numeric;
  this.includeSpecial = special; 

}

generateBtn.addEventListener("click", takeUserInput);

function takeUserInput() {

  userPref.passLength = checkDesiredLength();
  userPref.upper = checkDesiredCharTypes();

  //Debugging only.
  console.log(userPref.passLength);
  console.log(userPref.includeUpper);

}


//This function prompts the user to input a desired password length and then checks if it's within the accepted range.
function checkDesiredLength() {

  //Defines the minimum and maximum number of characters allowed for the password. Used to avoid "magic numbers".
  let minChars = 8, maxChars = 128;

  let desiredLength = prompt("Please enter your desired password length (Between 8 & 128).");

  // Check if desired length is within acceptable range. If so, return desiredLength to be stored else alert the user and reprompt them to enter a valid number using recursion.
  if (desiredLength >= 8 && desiredLength <= 128) {

    return desiredLength;

  } else {

    alert(`Invalid range. Your password length must be between ${minChars} and ${maxChars}.`);
    return checkDesiredLength();

  }

}

function checkDesiredCharTypes() {

  userPref.includeUpper = window.confirm("Would you like to use upper case letters in the password?");

}

  