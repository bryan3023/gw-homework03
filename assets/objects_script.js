"use strict";

// ### Assignment provided ###

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// ### Solution code begins ###

/*
  Entry point for the password generator. From a high level:
   - collect the criteria for password generation.
   - if the user doesn't specify at least one character set, show
     an alert and abort.
   - given the specified criteria, generate a password.
   - if the password does not meet all criteria, try again.
   - if the password does meet all criteria, return it so it can
     be written to the page.
 */
function generatePassword() {
  let
    minLength = 8,
    maxLength = 128,
    password = "";
  
  PasswordForm.requestPasswordProperties(minLength, maxLength);

  if (!PasswordCriteria.hasCharacterSets()) {
    alert("You must include at least one type of character to generate a password!");
    console.log("Aborted!");
    return "";
  }

  do {
    console.log("Generating password.")
    password = PasswordGenerator.generatePassword();
  } while (!PasswordValidator.isValidPassword(password));

  console.log("Done!");

  return password;
}

let PasswordGenerator = {
  /*
    Creates a password based on collected criteria.
   */
  generatePassword:
    function() {
      let
        characters = "",
        password = "";
    
      for (let set of PasswordCriteria.characterSets) {
        if (set.include) {
          characters += set.characters;
        }
      }
    
      for (let i = 0; i < PasswordCriteria.passwordLength; i++) {
        password += characters[this.getRandomInt(0, characters.length - 1)];
      }
    
      return password;
    },


  /*
    Helper function. Return a random number within an inclusive range.
   */
  getRandomInt:
    function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


/*
  Since we're not writing to the page, the "form" is a sequence of
  prompts.
 */
let PasswordForm = {
  /*
    Ask the user to specify a password length within an inclusive
    range, and return the answer.
   */
  promptPasswordLength:
    function(minLength, maxLength) {
      let
        passwordLength,
        isValidLength =
          function() {
            return Number.isInteger(passwordLength)
              && passwordLength >= minLength
              && passwordLength <= maxLength;
          };

      do {
        if (undefined !== passwordLength) {
          alert("Please provide a valid number for your password's length!");
        }
        passwordLength = prompt(
          `How many characters do you want the password to be? ` +
          `Choose between ${minLength} and ${maxLength} characters.`);
        passwordLength = parseInt(passwordLength);
      } while (!isValidLength());
    
      console.log("Password length will be %i characters.", passwordLength);
    
      return passwordLength;
    },


  /*
    Ask the user whether a given set of characters should be used to
    generate the password.
   */
  confirmIncludeCharacters:
    function(set) {
      let shouldIncludeChars =
        confirm(`Would you like to include ${set.name.toLowerCase()}?`);

      if (shouldIncludeChars) {
        console.log("%s will be included.", set.name);
        return true;
      } else {
        console.log("%s will not be included.", set.name);
        return false;
      }
    },

  
  /*
    Presents the user a sequence of prompts to collect the password criteria.
    It's like a form, but more annoying!
   */
  requestPasswordProperties:
    function(minLength,maxLength) {
      console.group("Collecting password parameters:");

      PasswordCriteria.passwordLength = this.promptPasswordLength(minLength, maxLength);
     
      for (let set of PasswordCriteria.characterSets) {
        set.include = this.confirmIncludeCharacters(set)
      }
    
      console.groupEnd();    
    }
}


/*
  Manages criteria for both creating a password and
  confirming a password conforms to them.
 */
let PasswordCriteria = {
  passwordLength: null,

  characterSets: [
    {
      name: "Lowercase letters",
      characters: "abcdefghijklmnopqrstuvwxyz",
      include: false
    },
    {
      name: "Uppercase letters",
      characters: null,
      include: false
    },
    {
      name: "Numbers",
      characters: "0123456789",
      include: false
    },
    {
      name: "Special characters",
      characters: " `~!@#$%^&*()_+-=[]\\{}|;':\",./<>?",
      include: false
    }
  ],


  /*
    Create the set of uppercase letters from the set of lowercase letters.
   */
  setUpperCaseLetters:
    function() {
      if (null === this.characterSets[1].characters) {
        this.characterSets[1].characters =
            this.characterSets[0].characters.toUpperCase();
      }
    },
  
  
  /*
    Return true if the password properties include at least one character
    set. Otherwise false.
   */
  hasCharacterSets:
    function() {
      let hasSet = false;
      for (let set of this.characterSets) {
        hasSet = hasSet || set.include;
      }
      return hasSet;
    }
}

PasswordCriteria.setUpperCaseLetters();


/*
  Validates a given password against criteria.
 */
let PasswordValidator = {
  /*
    Confirm the password meets the requirements the user specified.
   */
  isValidPassword:
    function(password) {
      let isValid = false;
      
      console.group("Validating password:");

      isValid = this.testPasswordLength(password);

      for (let set of PasswordCriteria.characterSets) {
        if (set.include) {
          isValid = this.testIncludesCharacters(password, set) && isValid;
        }
      }

      if (isValid) {
        console.log("All checks passed. Will now complete.");
      } else {
        console.log("Failures found. Will retry.");
      }

      console.groupEnd();

      return isValid;
    },


  /*
    Confirm the password is of the specified length.
   */
  testPasswordLength:
    function(password) {
      if (password.length === PasswordCriteria.passwordLength) {
        console.log("PASS: Password is %i characters long.", password.length);
        return true;
      } else {
        console.log("FAIL: Password is %i characters long.", password.length);
        return false;
      }
    },


  /*
    Confirm the password has at least one character from the specified
    character set.
   */
  testIncludesCharacters:
    function(password, set) {
      if (this.hasOneMatch(password, set.characters)) {
        console.log("PASS: %s found.", set.name);
        return true;
      } else {
        console.log("FAIL: %s not found.", set.name);
        return false;
      }
    },


  /*
    Helper function. Given a text string and a set of characters,
    return true on the first character match between them. Return
    false if no matches found.
   */
  hasOneMatch:
    function(text, characters) {
      for (let c of characters) {
        if (-1 !== text.indexOf(c)) {
          return true;
        }
      }
      return false;
    }
}
