// Assignment Code
var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
function writePassword() {
  var password = tempGen();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

//Begin my code.
// ====================================================== \\

//Event Listener for Click
generateBtn.addEventListener("click", takeUserInput);

//This will be a multi-dimensional array of possible characters.
let charSet = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['!', '#', '%', '^', '&', '*', '(', ')']
];

//Empty array to hold the password we generate.
let generatedPassword = [];

//User Preferences Object Constructor
function UserPreferences(length, lower, upper, numeric, special) {

  this.passLength = length;
  this.includeLower = lower;
  this.includeUpper = upper;
  this.includeNumeric = numeric;
  this.includeSpecial = special; 

}

let userPref = new UserPreferences();

function takeUserInput() {

  checkDesiredLength();
  checkDesiredCharTypes();
  writePassword();

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
  
  //This begins the conditional chain which takes the user's preferences and then builds a password built on them.
  if (userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial) {

    for (let i = 0; i < userPref.passLength; i++) {
    
      //Find the number of elements in that array. Might just hardcode the number for efficiency.
      let randomSet = randomizeSet();
      let numElements = charSet[randomSet].length;
      let randomElement = randomizeElement(numElements);

      generatedPassword[i] = charSet[randomSet][randomElement];

      password = generatedPassword.join('');

    }

    return password;

  } //else if (!userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial ) {

  //   //Need to improve modularity of these by making a generic function that takes arguments to determine which
  //   //subset of charSet to use.

    

  //   password = generatedPassword.join('');

  // }
}

//This function randomizes the subset of charSet to be used for password generation.
//TODO: Currently only uses all subsets. Needs to be sensitive to user preferences.
function randomizeSet() {
  return Math.floor(Math.random() * charSet.length);
}

//This function randomizes the element from the previous randomized subset.
function randomizeElement(numElements) {
  return Math.floor(Math.random() * numElements);
}

//I need an efficient way to write the code to generate the password based on preferences
//24 if else lines is a bit excessive...


function checkPrefCase() {

  let prefCase;

  //This is sloppy, slow, and not really needed but I want to separate this from generation so it's less cluttered.
  //Each statement can be broken down easier as a potential state of a 4-bit number with a bang '!' indicating a 0 and no bang indicating a 1.
      //0000
  if (!userPref.includeLower && !userPref.includeUpper && !userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 0;
      //0001
  } else if (!userPref.includeLower && !userPref.includeUpper && !userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 1;
      //0010
  } else if (!userPref.includeLower && !userPref.includeUpper && userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 2;
      //0011
  } else if (!userPref.includeLower && !userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 3;
      //0100
  } else if (!userPref.includeLower && userPref.includeUpper && !userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 4;
      //0101
  } else if (!userPref.includeLower && userPref.includeUpper && !userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 5;
      //0110
  } else if (!userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 6;
      //0111
  } else if (!userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 7;
      //1000
  } else if (userPref.includeLower && !userPref.includeUpper && !userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 8;
      //1001
  } else if (userPref.includeLower && !userPref.includeUpper && !userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 9;
      //1010
  } else if (userPref.includeLower && !userPref.includeUpper && userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 10;
      //1011
  } else if (userPref.includeLower && !userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 11;
      //1100
  } else if (userPref.includeLower && userPref.includeUpper && !userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 12;
      //1101
  } else if (userPref.includeLower && userPref.includeUpper && !userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 13;
      //1110
  } else if (userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && !userPref.includeSpecial) {
      prefCase = 14;
      //1111
  } else if (userPref.includeLower && userPref.includeUpper && userPref.includeNumeric && userPref.includeSpecial) {
      prefCase = 15;
  }

  return prefCase;

}

//This generates the password based on the case numbers from the preceding function.
function tempGen() {

  let pref = checkPrefCase();
  let password;
  
  switch (pref) {

    case 0:

      //0000 - No subsets are valid; therefore, spit error.
      window.alert("You must select at least one option.")

      break;
    
    //0001 - Special Only
    case 1:

      for (let i = 0; i < userPref.passLength; i ++) {

        let set = charSet[3];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = charSet[3][randomElement];

        password = generatedPassword.join('');

      }

      return password;

      //0010 - Numbers Only
      case 2:

      for (let i = 0; i < userPref.passLength; i ++) {

        let set = charSet[2];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;

    //0011 - Numbers & Special Characters
    case 3:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 0;

        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          //For some reason my brain can't comprehend boolean logic in the while condition right now so do this to make sure it works.
          if (rNumber == 2 || rNumber == 3) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }

        }

        //console.log("Loop broken.")
        console.log("Set Number: " + rNumber);
        let set = charSet[rNumber];

        let numElements = set.length;
        console.log(numElements);

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;

    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      break;
    case 11:
      break;
    case 12:
      break;
    case 13:
      break;
    case 14:
      break;
    case 15:

      for (let i = 0; i < userPref.passLength; i++) {
        
        let set = Math.floor(Math.random() * charSet.length);

        let numElements = charSet[set].length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = charSet[set][randomElement];

        password = generatedPassword.join('');

      }  

      return password;

    default:
      //Debugging only.
      window.alert("Invalid case error.")
      break;
  }

}

function randomNumber() {
  return Math.floor(Math.random() * charSet.length);
}