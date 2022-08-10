const assert = require("assert");

/**
 * Question 2
 *  For this question, you are required to implement splitString(input, n)
 *  so that the input string is split into 2 string, where
 *    1. the first part of the output array must have exactly n distinct characters
 *    2. the second part of the output array must have at least n distinct characters
 *
 *  Any combination of the input arguments that does not fulfil the requirements
 *  should throw exception
 *
 * Note: Concatenating the two parts should get back the original input string
 *
 *  Example 1
 *    input:    inputStr = 'helloworld',
 *              n = 3
 *    output:   ['hel', 'loworld']
 *
 * Example 2
 *   input:    inputStr = 'application'
 *             n = 3
 *   output = ['appl', 'ication']
 *
 * Example 3
 *   input:    inputStr = 'apple'
 *             n = 3
 *   output:   Exception
 *
 * Example 4
 *   input:    inputStr = 'foo'
 *             n = 3
 *   output:   Exception
 *
 */

function splitString(inputStr, n) {
  // TODO: Implement logic here
  // Please ensure that the assertions (line 46 - 49) is correct after implementing the logic
  let uniqueStr = "";
  const result = [...inputStr].reduce((resultArray, char, index) => {
    uniqueStr = uniqueStr.includes(char) ? uniqueStr : uniqueStr + char;
    //console.log(uniqueStr, [...uniqueStr].length, index, n);
    if ([...uniqueStr].length === n && resultArray.length === 0) {
      resultArray[0] = inputStr.substring(0, index + 1);
      resultArray[1] = inputStr.substring(index + 1);
    }
    return resultArray;
  }, []);

  const part1UniqueString = new Set(result[0]);
  const part2UniqueString = new Set(result[1]);
  // console.log(part1UniqueString, part1UniqueString.size);
  // console.log(part2UniqueString, part2UniqueString.size);
  // console.log(result[0] + result[1]);
  if ([...part1UniqueString].length !== n || [...part2UniqueString].length <= n)
    throw new Error("Output: Exception");

  return result;
}

console.log(splitString("application", 3));

// TODO: Uncommenting the assertion should not throw any exception
assert.deepStrictEqual(splitString("helloworld", 3), ["hel", "loworld"]);
assert.deepStrictEqual(splitString("application", 3), ["appl", "ication"]);
assert.throws(() => splitString("apple", 3));
assert.throws(() => splitString("foo", 3));
