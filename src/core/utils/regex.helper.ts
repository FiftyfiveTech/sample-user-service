enum RegExStrings {
  EMAIL_REGEX = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}",
  BASE64_IMAGE_STRING_REGEX = '^data:image/([a-zA-Z]*);base64,([^"]*)$',
  COUNTRY_CODE_2ALPHA_REGEX = "^[A-Z]{2}$",
}

class RegExHelper {
  constructor() {}

  /**
   * Validate regex based on types and check if they are valid.
   * @param type The type of the regex to be validated.
   * @param inputString The input string which is to be validated.
   * @returns Returns a value indicating if input is valid.
   */
  validateRegex: (type: RegExStrings, inputString: string) => boolean = (
    type,
    inputString
  ) => {
    const regex = new RegExp(type);
    const result = regex.test(inputString);
    return result;
  };
}

export { RegExStrings, RegExHelper };
