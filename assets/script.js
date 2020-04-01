// Assignment Code
var generateBtn = document.querySelector("#generate");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function promptPasswordLength() {
  let
    min = 8,
    max = 128,
    length;

  do {
    length = prompt(
      "How long do you want the password to be? Choose between " +
      min + " and " + max + " characters."
    );
    length = parseInt(length);
  } while (isNaN(length) || length < min || length > max);

  console.log(" - Password length will be %i", length);

  return length;
}

function confirmIncludeCharacters(characterName, characters) {
  
  shouldInclude = confirm(
    "Would you like to include " +
    characterName.toLowerCase() + "?"
  );

  if (shouldInclude) {
    console.log(" - %s will be included.", characterName);
    return characters;
  } else {
    console.log(" - %s will not be included.", characterName);
    return "";
  }
}

function generatePassword() {
  const
    letters = "abcdefghijklmnopqrstuvwxyz",
    numbers = "0123456789",
    special = " `~!@#$%^&*()_+-=[]\\{}|;':\",./<>?";

  let
    length,
    includedCharacters,
    password = "";

  console.log("Begin generating password:");

  length = promptPasswordLength();
 
  includedCharacters = confirmIncludeCharacters("Lowercase letters", letters);
  includedCharacters += confirmIncludeCharacters("Uppercase letters", letters.toUpperCase());
  includedCharacters += confirmIncludeCharacters("Numbers", numbers);
  includedCharacters += confirmIncludeCharacters("Special characters", special);

  if (0 === includedCharacters.length) {
    alert("You must include at least one type of character to generate a password!");
    return "";
  }

  for (let i = 0; i < length; i++) {
    password += includedCharacters[getRandomInt(0, includedCharacters.length - 1)];
  }

  console.log("Done! Created password %i characters long.", password.length);

  return password;

}


// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
