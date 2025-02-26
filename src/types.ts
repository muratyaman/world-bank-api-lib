import type { AxiosInstance } from 'axios';

export namespace WorldBankApiTypes {

  export interface WorldBankApi {
    _client: AxiosInstance;
    getIndicatorDataByIdAndCountry: (inputs: InputsForIndicatorDataByIdAndCountry) => Promise<ResponseOfIndicatorDataByIdAndCountry>;
  }

  export interface Config {
    baseURL?: string;
    timeout?: number;
  }

  export interface InputsForIndicatorDataByIdAndCountry extends CommonInputs {
    indicatorId: string;
    countryId  : string;
    startYear? : number;
    endYear?   : number;
  }

  export interface CommonInputs {
    format?  : string;
    page?    : number;
    per_page?: number;
  }

  export interface Page {
    page: number;
    pages: number;
    per_page: number;
    total: number;
    sourceid: string;
    lastupdated: string;
  }

  export interface Indicator {
    id: string;
    value: string;
  }

  export interface Country {
    id: string;
    value: string;
  }

  export interface IndicatorDataByIdAndCountry {
    indicator: Indicator;
    country: Country;
    countryiso3code: string;
    date: string;
    value: number;
    unit: string;
    obs_status: string;
    decimal: number;
  }

  export type ResponseOfIndicatorDataByIdAndCountry = [ Page, IndicatorDataByIdAndCountry[] ];

  export interface ValueByYear {
    year: number;
    value: number;
  }
}
