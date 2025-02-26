import assert from 'node:assert';
import { before, describe, it } from 'node:test';
import nock from 'nock';

import { COUNTRIES, defaultBaseUrl, INDICATORS, makeWorldBankApiClient, reduceIndicatorDataByIdAndCountry } from '..';
import {WorldBankApiTypes as Types } from '../types';
import * as data from './fixtures';

describe('world bank api', () => {

  let api: Types.WorldBankApi;

  before(() => {
    api = makeWorldBankApiClient({});
  });

  it('should get indicator data set', async () => {
    const scope = nock(defaultBaseUrl)
      .get(`/country/${COUNTRIES.Turkiye}/indicator/${INDICATORS.TotalPopulation}`)
      .query((qry) => true) // match any params
      .reply(200, data.indicatorDatasetByIdAndByCountry);

    const out = await api.getIndicatorDataByIdAndCountry({
      indicatorId: INDICATORS.TotalPopulation,
      countryId: COUNTRIES.Turkiye,
    });

    assert.strictEqual(out.length, data.indicatorDatasetByIdAndByCountry.length);
    assert.strictEqual(out[1].length, data.indicatorDatasetByIdAndByCountry[1].length);
  });

  it('reducer should work', () => {
    const out = reduceIndicatorDataByIdAndCountry(data.indicatorDatasetByIdAndByCountry);
    assert.strictEqual(out.length, data.indicatorDatasetByIdAndByCountry[1].length);
    assert.equal(out[0].year, data.indicatorDatasetByIdAndByCountry[1][0].date);
    assert.strictEqual(out[0].value, data.indicatorDatasetByIdAndByCountry[1][0].value);
  });

});
