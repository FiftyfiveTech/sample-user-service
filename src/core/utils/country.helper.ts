import * as fs from "fs";
import * as util from "util";
import { Country, CountryDialCode } from "../interfaces";
import { error, RegExHelper, RegExStrings } from "./index";

enum DataFileUrl {
  COUNTRY_URL = "src/defaultData/country.json",
  COUNTRY_DIAL_CODES_URL = "src/defaultData/countryDialCodes.json",
}

class CountryHelper {
  constructor() {}

  /**
   * Read the data from a file and return the buffer data.
   * @param url The url of the data file.
   */
  private readDataFromFile: (url: DataFileUrl) => Promise<Buffer> = async (
    url
  ) => {
    const readFile = util.promisify(fs.readFile);
    try {
      const data = await readFile(url);
      return data;
    } catch {
      throw error.createError(
        error.ErrorCode.INTERNAL_ERROR,
        `Cannot read data in file: ${url}`
      );
    }
  };

  /**
   * Check if a provided country code is valid, and return the result.
   * @param countryCode The country code to validate.
   */
  private isValidCountryCode2Alpha: (countryCode: string) => boolean = (
    countryCode
  ) => {
    const regExHelper = new RegExHelper();
    return regExHelper.validateRegex(
      RegExStrings.COUNTRY_CODE_2ALPHA_REGEX,
      countryCode.toUpperCase()
    );
  };
  
  /**
   * Get a list of the available countries in the system.
   */
  getCountries: () => Promise<Country[]> = async () => {
    try {
      const countries = await this.readDataFromFile(DataFileUrl.COUNTRY_URL);
      return JSON.parse(countries.toString());
    } catch {
      throw error.createError(
        error.ErrorCode.RESOURCE_ID_NOT_FOUND,
        `Could not find countries`
      );
    }
  };

  /**
   * Fetch a country's details by its country code.
   * @param countryCode The country code to get the country details.
   */
  getCountryByCode: (countryCode: string) => Promise<Country> = async (
    countryCode
  ) => {
    if (!this.isValidCountryCode2Alpha(countryCode)) {
      throw error.createError(
        error.ErrorCode.RESOURCE_ID_NOT_FOUND,
        `Invalid Country Code: ${countryCode}`
      );
    }

    try {
      const countries = await this.getCountries();
      const countryData = countries.filter(
        (value) => value.countryCode2Alpha === countryCode
      );
      if (!countryData.length) {
        throw Error();
      }
      return countryData[0];
    } catch {
      throw error.createError(
        error.ErrorCode.RESOURCE_ID_NOT_FOUND,
        `Could not find any country with code: ${countryCode}`
      );
    }
  };

  /**
   * Get the list of cities for a country.
   * @param countryCode The country code for which cities are needed.
   */
  getCitiesByCountry: (countryCode: string) => Promise<string[]> = async (
    countryCode
  ) => {
    try {
      const country = await this.getCountryByCode(countryCode);
      return country.cities;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Get a list of all the available dial codes by country.
   */
  getCountryDialCodes: () => Promise<CountryDialCode[]> = async () => {
    try {
      const dialCodes = await this.readDataFromFile(
        DataFileUrl.COUNTRY_DIAL_CODES_URL
      );
      return JSON.parse(dialCodes.toString());
    } catch {
      throw error.createError(
        error.ErrorCode.RESOURCE_ID_NOT_FOUND,
        `Could not find any country dial code`
      );
    }
  };

  /**
   * Get dial code of a specific country by its code.
   * @param countryCode The country code for we dial code is needed.
   */
  getDialCodeByCountry: (countryCode: string) => Promise<string> = async (
    countryCode
  ) => {
    try {
      const countryDialCode = await this.getCountryDialCodes();
      const phoneCodeData = countryDialCode.filter(
        (value) => value.code === countryCode
      );
      if (!phoneCodeData.length) {
        throw Error();
      }
      return phoneCodeData[0].dialCode;
    } catch {
      throw error.createError(
        error.ErrorCode.RESOURCE_ID_NOT_FOUND,
        `Could not find any country with code: ${countryCode}`
      );
    }
  };
}

export { CountryHelper };
