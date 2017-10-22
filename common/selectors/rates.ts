import { AppState } from 'reducers';
import { CCResponse } from 'actions/rates';
import { Optional } from 'utils/types';

export function getRates(
  state: AppState
): Optional<CCResponse> | null | undefined {
  return state.rates.rates;
}
