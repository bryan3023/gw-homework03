"use strict";

// --- Assignment provided ---

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// --- Solution code begins ---

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
  Ask the user a series of questions, then generate and return a
  random password.
 */
function generatePassword() {
  let
    password = "",
    parameters = getPasswordParameters();

  if ("" === parameters.characters) {
    alert("You must include at least one type of character to generate a password!");
    return "";
  }

  for (let i = 0; i < parameters.length; i++) {
    password += parameters.characters[getRandomInt(0, parameters.characters.length - 1)];
  }

  console.log("Done! Created a password %i characters long.", password.length);

  return password;
}


/*
  Ask the user a series of questions, then return the specified
  parameters.
 */
function getPasswordParameters() {
  let
    passwordLength,
    includedCharacters = "";

  console.group("Collecting password parameters:");

  passwordLength = promptPasswordLength(minLength, maxLength);
 
  for (let set of characterSets) {
    if (set.include = confirmIncludeCharacters(set)) {
      includedCharacters += set.characters;
    }
  }

  console.groupEnd();

  return {
    length: passwordLength,
    characters: includedCharacters
  }
}


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