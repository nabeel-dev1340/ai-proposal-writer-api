// Custom validation to check for empty required fields
const checkForEmptyRequiredFields = (schema, data, dataPath = "") => {
  if (schema.required && schema.required.length > 0) {
    for (const requiredField of schema.required) {
      const fieldPath = dataPath
        ? `${dataPath}.${requiredField}`
        : requiredField;
      const fieldValue = data[requiredField];

      if (
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === ""
      ) {
        return [{ param: fieldPath, msg: `${fieldPath} is a required field` }];
      }

      if (typeof fieldValue === "object" && !Array.isArray(fieldValue)) {
        const nestedErrors = checkForEmptyRequiredFields(
          schema.properties[requiredField],
          fieldValue,
          fieldPath
        );
        if (nestedErrors.length > 0) {
          return nestedErrors;
        }
      }
    }
  }
  return [];
};

export default checkForEmptyRequiredFields;
