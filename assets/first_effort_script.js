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

const
  minLength = 8,
  maxLength = 128,
  characterSets = [
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
  ];

setUpperCaseLetters();


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
    password = "",
    parameters = getPasswordParameters();

  if (!parameters.hasCharacters) {
    alert("You must include at least one type of character to generate a password!");
    console.log("Aborted!");
    return "";
  }

  do {
    console.log("Generating password.")
    password = createPassword(parameters.length);
  } while (!isValidPassword(password, parameters.length));

  console.log("Done!");

  return password;
}


/*
  Ask the user a series of questions, then return the specified
  parameters.
 */
function getPasswordParameters() {
  let
    passwordLength,
    includesCharacters = false;

  console.group("Collecting password parameters:");

  passwordLength = promptPasswordLength(minLength, maxLength);
 
  for (let set of characterSets) {
    set.include = confirmIncludeCharacters(set)
    includesCharacters = includesCharacters || set.include;
  }

  console.groupEnd();

  return {
    length: passwordLength,
    hasCharacters: includesCharacters
  }
}


/*
  Creates the password based on collected criteria.
 */
function createPassword(length) {
  let
    characters = "",
    password = "";

  for (let set of characterSets) {
    if (set.include) {
      characters += set.characters;
    }
  }

  for (let i = 0; i < length; i++) {
    password += characters[getRandomInt(0, characters.length - 1)];
  }

  return password;
}


// --- Functions to collect criteria from the user ---

/*
  Ask the user to specify a password length within an inclusive
  range, and return the answer.
 */
function promptPasswordLength(minLength, maxLength) {
  let passwordLength;

  do {
    if (undefined !== passwordLength) {
      alert("Please provide a valid number for your password's length!");
    }

    passwordLength = prompt(
      "How many characters do you want the password to be? Choose between " +
      minLength + " and " + maxLength + " characters."
    );
    passwordLength = parseInt(passwordLength);
  } while (isNaN(passwordLength) || passwordLength < minLength || passwordLength > maxLength);

  console.log("Password length will be %i characters.", passwordLength);

  return passwordLength;
}


/*
  Ask the user whether a given set of characters should be used to
  generate the password.
 */
function confirmIncludeCharacters(set) {
  let shouldIncludeChars = confirm(
    "Would you like to include " + set.name.toLowerCase() + "?");

  if (shouldIncludeChars) {
    console.log("%s will be included.", set.name);
    return true;
  } else {
    console.log("%s will not be included.", set.name);
    return false;
  }
}


// --- Password validation functions ---

/*
  Confirm the password meets the requirements the user specified.
 */
function isValidPassword(password, length) {
  let isValid = false;
  
  console.group("Validating password:");

  isValid = testPasswordLength(password, length);

  for (let set of characterSets) {
    if (set.include) {
      isValid = testIncludesCharacters(password, set) && isValid;
    }
  }

  if (isValid) {
    console.log("All checks passed. Will now complete.");
  } else {
    console.log("Failures found. Will retry.");
  }

  console.groupEnd();

  return isValid;
}


/*
  Confirm the password is of the specified length.
 */
function testPasswordLength(password, length) {
  if (password.length === length) {
    console.log("PASS: Password is %i characters long.", password.length);
    return true;
  } else {
    console.log("FAIL: Password is %i characters long.", password.length);
    return false;
  }
}


/*
  Confirm the password has at least one character from the specified
  character set.
 */
function testIncludesCharacters(password, set) {
  if (hasOneMatch(password, set.characters)) {
    console.log("PASS: %s found.", set.name);
    return true;
  } else {
    console.log("FAIL: %s not found.", set.name);
    return false;
  }
}


// --- Helper functions ---

/*
  Create the set of uppercase letters from the set of lowercase letters.
 */
function setUpperCaseLetters() {
  if (null === characterSets[1].characters) {
    characterSets[1].characters =
        characterSets[0].characters.toUpperCase();
  }
}


/*
  Return a random number within an inclusive range.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
  Given a text string and a set of characters, return true on the
  first character match between them. Return false if no matches
  found.
 */
function hasOneMatch(text, characters) {
  for (let c of characters) {
    if (-1 !== text.indexOf(c)) {
      return true;
    }
  }
  return false;
}