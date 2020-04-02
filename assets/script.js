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

/*
  Ask the user a series of questions, then generate and return a
  random password.
 */
function generatePassword() {
  const
    minLength = 8,
    maxLength = 128,
    letters = "abcdefghijklmnopqrstuvwxyz",
    numbers = "0123456789",
    special = " `~!@#$%^&*()_+-=[]\\{}|;':\",./<>?";

  let
    passwordLength,
    includedCharacters,
    password = "";

  console.log("Begin generating password:");

  passwordLength = promptPasswordLength(minLength, maxLength);
 
  includedCharacters = confirmIncludeCharacters("Lowercase letters", letters);
  includedCharacters += confirmIncludeCharacters("Uppercase letters", letters.toUpperCase());
  includedCharacters += confirmIncludeCharacters("Numbers", numbers);
  includedCharacters += confirmIncludeCharacters("Special characters", special);

  if (0 === includedCharacters.length) {
    alert("You must include at least one type of character to generate a password!");
    return "";
  }

  for (let i = 0; i < passwordLength; i++) {
    password += includedCharacters[getRandomInt(0, includedCharacters.length - 1)];
  }

  console.log("Done! Created a password %i characters long.", password.length);

  return password;
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

  console.log(" - Password length will be %i", passwordLength);

  return passwordLength;
}


/*
  Ask the user whether a given set of characters should be used to
  generate the password. If so, return the character set. If not,
  return an empty string.
 */
function confirmIncludeCharacters(characterSetName, characterSet) {
  let shouldIncludeChars = confirm(
    "Would you like to include " +
    characterSetName.toLowerCase() + "?"
  );

  if (shouldIncludeChars) {
    console.log(" - %s will be included.", characterSetName);
    return characterSet;
  } else {
    console.log(" - %s will not be included.", characterSetName);
    return "";
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