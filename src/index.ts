import axios from 'axios';
import { WorldBankApiTypes as Types } from './types';

export const defaultBaseUrl   = 'https://api.worldbank.org/v2';
const defaultTimeout   = 10 * 1000; // 10 seconds
const defaultStartYear = 2000;

export const INDICATORS = {
  TotalPopulation: 'SP.POP.TOTL',
};

export const COUNTRIES = {
  Turkiye: 'TUR',
};

/**
 * @see https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures
 * @param {Types.Config} config
 * @returns {Types.WorldBankApi}
 */
export function makeWorldBankApiClient(config: Types.Config = {}): Types.WorldBankApi {
  const {
    baseURL = defaultBaseUrl,
    timeout = defaultTimeout,
  } = config || {};

  const _client = axios.create({ baseURL, timeout });

  const defaultParams = {
    format  : 'json',
    page    : 1,
    per_page: 1000,
  };

  async function getIndicatorDataByIdAndCountry(inputs: Types.InputsForIndicatorDataByIdAndCountry): Promise<Types.ResponseOfIndicatorDataByIdAndCountry> {
    const {
      indicatorId,
      countryId,
      startYear = defaultStartYear,
      endYear = currentYear(),
      page = defaultParams.page,
      per_page = defaultParams.per_page,
    } = inputs;

    const date   = `${startYear}:${endYear}`; // e.g. '2000:2025';
    const params = { ...defaultParams, page, per_page, date };
    const path   = `/country/${countryId}/indicator/${indicatorId}`;

    const response = await _client.get<Types.ResponseOfIndicatorDataByIdAndCountry>(path, { params });

    return response.data;
  }

  return {
    _client,
    getIndicatorDataByIdAndCountry,
  };
}

export function reduceIndicatorDataByIdAndCountry(dataset: Types.ResponseOfIndicatorDataByIdAndCountry): Types.ValueByYear[] {
  const [_page, rows] = dataset;
  return rows.map(({ date, value }) => ({ year: Number.parseInt(date), value }));
}

function currentYear(): number {
  return new Date().getFullYear();
}
