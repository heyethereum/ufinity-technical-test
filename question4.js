const assert = require("assert");
/**
 *
 * IMPORTANT NOTE:
 *
 * This is a bonus coding question that is more complex than the previous ones.
 * If you are not able to complete it, you can either
 *    1. skip this question
 *    2. submit uncompleted codes
 *
 */

/**
 * Question 4
 * A validation library will return the following errors.
 * Please implement a transformation method to transform errors into transformedErrors
 *
 *
 * Property is the key of an object that violate the constraints
 * Constraints contains the constraints that were violated
 * Children is the nested object.
 *     There is no limit to the number of nested layer.
 *     A child can have children which have children, so on and so forth
 *
 *
 * Sample Object
 *
 * {
 *     id: 'abc',
 *     storeVariantPriceOverrides: [{
 *         storeId: 'xyz',
 *     }]
 * }
 *
 */
const errors = [
  {
    property: "storeVariantPriceOverrides",
    children: [
      {
        property: "0",
        children: [
          {
            property: "storeId",
            children: [],
            constraints: {
              isNumber:
                "storeId must be a number conforming to the specified constraints",
            },
          },
        ],
      },
    ],
  },
  {
    property: "id",
    constraints: {
      isNumber: "id must be a number conforming to the specified constraints",
    },
  },
];

const transformedErrors = {
  id: ["id must be a number conforming to the specified constraints"],
  "storeVariantPriceOverrides.0.storeId": [
    "storeId must be a number conforming to the specified constraints",
  ],
};

// You can change the input parameters to what you need
const formatErrors = (errors) => {
  return errors.reduce((obj, element) => {
    let computedProperty = undefined;

    const deflate = (object) => {
      console.log("deflate function");
      Object.keys(object).forEach((key) => {
        console.log("key:", key);
        //console.log("computedProperty:", computedProperty);
        if (typeof object[key] === "object" && object[key])
          return deflate(object[key]);

        if (object.property) {
          computedProperty === undefined
            ? (computedProperty = object["property"])
            : (computedProperty = computedProperty + "." + object["property"]);
        } else if (object[key] && key === "isNumber") {
          obj = { ...obj, [computedProperty]: [object[key]] };
        }
      });
    };
    deflate(element);

    return obj;
  }, {});
};

console.log(formatErrors(errors));

// TODO: Uncommenting the assertion should not throw any exception
assert.deepStrictEqual(formatErrors(errors), transformedErrors);
