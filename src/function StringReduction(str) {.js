function StringReduction(str) {
  // Set initial counter variable to 0
  var i = 0;
  // Split the string into an array of letters
  var letters = str.split("");
  // Start do loop.
  do {
    // If the first and second letter in the array match any of the pairs
    if (
      (letters[i] == "a" && letters[i + 1] == "b") ||
      (letters[i] == "b" && letters[i + 1] == "a")
    ) {
      // Remove the second letter
      letters.splice(i + 1, 1);
      // Transform the first letter
      letters[i] = "c";
      // Set the counter back to 0 so we can start at the beginning again
      i = 0;
    } else if (
      (letters[i] == "b" && letters[i + 1] == "c") ||
      (letters[i] == "c" && letters[i + 1] == "b")
    ) {
      letters.splice(i + 1, 1);
      letters[i] = "a";
      i = 0;
    } else if (
      (letters[i] == "c" && letters[i + 1] == "a") ||
      (letters[i] == "a" && letters[i + 1] == "c")
    ) {
      letters.splice(i + 1, 1);
      letters[i] = "b";
      i = 0;
      // If no conditions are met, incremenet the counter
    } else {
      i++;
    }
  } while (i < letters.length);
  // Return the length of the transformed string
  return letters.length;
}

console.log(StringReduction("baccabcbc"));
