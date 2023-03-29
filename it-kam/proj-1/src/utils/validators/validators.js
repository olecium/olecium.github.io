export const required = value => value ? undefined : "Field is required";

export const maxLengthCreator = maxLength => value => 
    value.length > maxLength ? `Maximum message length is ${maxLength} symbols.`: undefined;