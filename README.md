# gw-homework03

## Synopsis

This project is the deliverable for the **JavaScript** lesson's homework.

It presents a simple web form from which users can generate passwords composed of random characters.

The criteria for these passwords are as follows:
- The password length must be between 8 and 128 characters, inclusive.
- The user must choose to include at least one of the following categories of characters:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters (as specified in [OWASP's list](https://www.owasp.org/index.php/Password_special_characters))

Based on the criteria the user select, the program will generate a password, and then run a series of checks to ensure it meets them. There is a chance, particularly for small passwords, that not all of the specified character sets will be included. In such cases, a new password will be generated until all tests pass.

To use use this program, go to [the site](https://bryan3023.github.io/gw-homework03/) and click the *Generate Password* button. Then answer the sequence of prompts until a password is generated for you.

There is also [another version](https://bryan3023.github.io/gw-homework03/objects.html) that's functionally identical but attempts to incorporate a more object-oriented approach. It's very much a first effort; the code is longer, but maybe a bit more modular.

In both versions, you can use the Developer Tools Console to confirm you input is processed correctly.