// Assignment Code
var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

//Event Listener for Click
generateBtn.addEventListener("click", takeUserInput);

//This is is the defined character set for the password generator using a multi-dimensional array.
let charSet = [
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['!', '#', '%', '^', '&', '*', '(', ')']
];

//Determines the maximum and minimum number of characters the generator allows.
let minChars = 8, maxChars = 128;

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

//Takes the user's input preferences.
function takeUserInput() {

  checkDesiredLength();
  checkDesiredCharTypes();
  writePassword();

}

//This function prompts the user to input a desired password length and then validates if it's within the accepted range of values.
function checkDesiredLength() {

  let desiredLength = prompt("Please enter your desired password length (Between 8 & 128).");

  // Check if desired length is within acceptable range. If so, return desiredLength to be stored else alert the user and reprompt them to enter a valid number using recursion.
  if (desiredLength >= minChars && desiredLength <= maxChars) {

    userPref.passLength = desiredLength;
    return;

  } else {
    
    //Alerts the user if their desired password length is out of range. If so, recursively the parent function again.
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

//Checks the conditions the user entered and gives it a unique number which is used to determine which password algorithm to use in generatePassword.
//It's a bit sloppy and redundant but I wanted to be able to hide these long conditionals.
function checkPrefCase() {

  let prefCase;

  //Each statement can be remembered easier as a potential state of a 4-bit number with a bang '!' indicating a 0 and no bang indicating a 1.
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

//This generates the password based on the case numbers from the checkPreCase function.
//TODO: Needs to refactored. I despise this...
function generatePassword() {

  let pref = checkPrefCase();
  let password;
  
  switch (pref) {

    //0000 - No subsets are valid; therefore, spit error.
    case 0:

      
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

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;

    //0100 - Upper Case Only
    case 4:
      
      for (let i = 0; i < userPref.passLength; i ++) {

        let set = charSet[1];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;
    
    //0101 - Upper Case or Special
    case 5:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 0;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          //For some reason my brain can't comprehend boolean logic in the while condition right now so do this to make sure it works.
          if (rNumber == 1 || rNumber == 3) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;
    
    //0110 - Upper Case or Numbers
    case 6:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 0;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          if (rNumber == 1 || rNumber == 2) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
      return password;

    //0111 - Upper Case, Numbers, or Special
    case 7:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 0;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          if (rNumber == 1 || rNumber == 2 || rNumber == 3) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
      return password;

    //1000 - Lower Case Only
    case 8:

      for (let i = 0; i < userPref.passLength; i ++) {

        let set = charSet[0];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
    
      return password;

    //1001 - Lower Case & Special
    case 9:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 5;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          if (rNumber == 0 || rNumber == 3) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        console.log(rNumber);
        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;
    //1010 - Lower Case & Numbers
    case 10:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 5;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          if (rNumber == 0 || rNumber == 2) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        console.log(rNumber);
        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
      return password;
    //1011 - Lower Case, Numbers, & Specials
    case 11:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 5;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          if (rNumber == 0 || rNumber == 2 || rNumber == 3) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
      return password;

    //1100 - Lower Case & Upper Case
    case 12:

      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 5;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          //For some reason my brain can't comprehend boolean logic in the while condition right now so do this to make sure it works.
          if (rNumber == 0 || rNumber == 1) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }

      return password;
    
    //1101 - Lower Case, Upper Case, & Specials
    case 13:
      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 5;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          //For some reason my brain can't comprehend boolean logic in the while condition right now so do this to make sure it works.
          if (rNumber == 0 || rNumber == 1 || rNumber == 3) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
      return password;

    //1110 - Upper Case, Lower Case, & Numbers
    case 14:
      for (let i = 0; i < userPref.passLength; i++) {

        let rNumber = 5;
        let logic = true;

        //If the random number isn't an accepted set regenerate until it is.
        while (logic) {
          
          //For some reason my brain can't comprehend boolean logic in the while condition right now so do this to make sure it works.
          if (rNumber == 0 || rNumber == 1 || rNumber == 2) {
            logic = false;
          } else {
            rNumber = randomNumber();
          }
        }

        let set = charSet[rNumber];

        let numElements = set.length;

        let randomElement = Math.floor(Math.random() * numElements);

        generatedPassword[i] = set[randomElement];

        password = generatedPassword.join('');

      }
      return password;

    //1111 - All Options
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
      window.alert("Invalid case error. (Something went wrong...)")
      break;
  }

}

//Generates random numbers to be used in the generatePassword function.
function randomNumber() {
  return Math.floor(Math.random() * charSet.length);
}