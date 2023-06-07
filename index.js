const _ = require("lodash");
const simpleArray = require("./data/simple-array.json");
const yogaClasses = require("./data/yoga.json");
const members = require("./data/members.json");
const newMember = require("./data/new-member");

/**
 * Return the number of keys in an object
 * @param {Object} obj -
 * @return {number} The number of keys in the object
 */
function numberOfKeys(obj) {
  return Object.keys(obj).length;
}


/**
 * Remove the falsy values in a numbers array and return the sum
 * @param {numbers[]} array - An array of numbers that can also contain some falsy values
 * @return {number} The sum of the numbers in an array
 */
function sumNumbers(array) {
  const filteredArray = array.filter((num) => Boolean(num));
  const sum = filteredArray.reduce((acc, num) => acc + num, 0);
  return sum;
}

/**
 * Convert a two-dimensional array of new member data (each inner array having two values: the first being the key, the second being the value) into an object
 * @param {Array[]} member -
 * @return {number} The sum of the numbers in an array
 */
function newMemberArrayToObject(member) {
  return member.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}

/**
 * Return an array of objects that grouped by instructors from the classes array of objects
 * @param {Object[]} collection - an array of yoga class objects
 * @return {Object[]} - the reshaped collection where the classes are grouped by instructor name
 */
function groupClassByInstructor(collection) {
  return collection.reduce((grouped, classObj) => {
    const instructor = classObj.instructor;
    if (instructor in grouped) {
      grouped[instructor].push(classObj);
    } else {
      grouped[instructor] = [classObj];
    }
    return grouped;
  }, {});
}


/**
 * Remove the age key from the members array of object
 * @param {Object} collection - an array of member objects
 * @return {number} The array of member objects, each one without the age field
 */
function omitAgeFromMembers(collection) {
  return collection.map(member => {
    const { age, ...rest } = member;
    return rest;
  });
}


/**
 * Return the count of the number of classes a particular instructor teaches
 * @param {Object[]} collection - An array of yoga class objects
 * @param {String} instructorName - The name of the instructor
 * @return {number} The sum of the numbers in an array
 */
function countClassesByInstructor(collection, instructorName) {
  return collection.reduce((count, classObj) => {
    if (classObj.instructor === instructorName) {
      count++;
    }
    return count;
  }, 0);
}

/**
 * Remove inactive members from the members array
 * @param {Object} collection - an array of member objects
 * @return {number} The array of member objects with only active members
 */
function removeInactiveMembers(collection) {
  return collection.filter(member => member.active);
}


/**
 * Get a list of unique class titles and their price
 * @param {Object} collection - an array of yoga class objects
 * @return {number} An array of objects that have a unique title and a price
 */
function getUniqueClasses(collection) {
  const uniqueClasses = collection.reduce((result, classObj) => {
    const existingClass = result.find(item => item.title === classObj.title);
    if (!existingClass) {
      result.push({ title: classObj.title, price: classObj.price });
    }
    return result;
  }, []);

  return uniqueClasses;
}


/**
 * Get a list of classes organized by title, then by level.
 * The titles should be in ascending order, the levels should be in descending order
 * @param {Object} collection - an array of yoga class objects
 * @return {number} An array of objects that are organized by title then by level. The array should only have the title, instructor, and level fields
 */
function orderClassesByTitleAndLevel(collection) {
  const orderedClasses = collection.sort((classA, classB) => {
    if (classA.title < classB.title) {
      return -1;
    } else if (classA.title > classB.title) {
      return 1;
    } else {
      // If the titles are equal, sort by level in descending order
      if (classA.level < classB.level) {
        return 1;
      } else if (classA.level > classB.level) {
        return -1;
      } else {
        return 0;
      }
    }
  });


module.exports = {
  numberOfKeys,
  sumNumbers,
  newMemberArrayToObject,
  groupClassByInstructor,
  omitAgeFromMembers,
  countClassesByInstructor,
  removeInactiveMembers,
  getUniqueClasses,
  orderClassesByTitleAndLevel,
};
