// Assignment Code
var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// // Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);

//Begin my code.
// ====================================================== \\

//This will be a multi-dimensional array of possible characters.
let charSet = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['!', '#', '%', '^', '&', '*', '(', ')']
];

let generatedPassword = [];

//User Preferences Constructor
function UserPreferences(length, lower, upper, numeric, special) {

  this.passLength = length;
  this.includeLower = lower;
  this.includeUpper = upper;
  this.includeNumeric = numeric;
  this.includeSpecial = special; 

}

let userPref = new UserPreferences();

generateBtn.addEventListener("click", takeUserInput);

function takeUserInput() {

  checkDesiredLength();
  checkDesiredCharTypes();
  writePassword();

  //Debugging only.
  console.log(userPref.passLength);
  console.log(userPref.includeLower);
  console.log(userPref.includeUpper);
  console.log(userPref.includeNumeric);
  console.log(userPref.includeSpecial);

}

//This function prompts the user to input a desired password length and then checks if it's within the accepted range of values.
function checkDesiredLength() {

  //Defines the minimum and maximum number of characters allowed for the password. Used to avoid "magic numbers".
  //TODO: Make this global maybe?
  let minChars = 8, maxChars = 128;

  let desiredLength = prompt("Please enter your desired password length (Between 8 & 128).");

  // Check if desired length is within acceptable range. If so, return desiredLength to be stored else alert the user and reprompt them to enter a valid number using recursion.
  if (desiredLength >= 8 && desiredLength <= 128) {

    userPref.passLength = desiredLength;
    return;

  } else {
    
    alert(`Invalid range. Your password length must be between ${minChars} and ${maxChars}.`);
    return checkDesiredLength();

  }

}

//Asks the user to confirm their desired character types to be used in the generated password. 
function checkDesiredCharTypes() {

  userPref.includeLower = window.confirm("Would you like to use lower case letters in your password?")
  userPref.includeUpper = window.confirm("Would you like to use upper case letters in your password?");
  userPref.includeNumeric = window.confirm("Would you like to use numeric characters in your password?");
  userPref.includeSpecial = window.confirm("Would you like to use special characters in your password?");

}

//Contains the logic to generate a password using the the users earlier defined preferences.
function generatePassword() {

  let password;
  
  //TODO: Finish the generation logic. Look for optimizations afterwards.
  // switch (userPref) {

  //    case userPref.includeLower: //&& userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial):

  //      for (let i = 0; i < userPref.passLength; i++) {

  //      //Pick a random subset of the charSet array. Might just hardcode the number for efficiency.
  //      let randomizeSet = Math.floor(Math.random() * charSet.length);

  //      //Find the number of elements in that array. Might just hardcode the number for efficiency.
  //      let numElements = charSet[randomizeSet].length;

  //      let randomElement = Math.floor(Math.random() * numElements);

  //      password += randomElement;
      
  //      }

  //      break;

  //    default:
  //      break;

  if (userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial) {

    for (let i = 0; i < userPref.passLength; i++) {

      //Pick a random subset of the charSet array. Might just hardcode the number for efficiency.
      let randomizeSet = Math.floor(Math.random() * charSet.length);
    
      //Find the number of elements in that array. Might just hardcode the number for efficiency.
      let numElements = charSet[randomizeSet].length;
    
      let randomElement = Math.floor(Math.random() * numElements);
      
      generatedPassword[i] = 

      password = 
      //password = password.concat.randomElement;

    }

    console.log(password);
    return password;

  }
}
  //Outline
  //Check the value of each item in userPref.
  //Generate a password based on that.
  //Does not generate all possible passwords but only the one narrowed by the selection criteria.
  
