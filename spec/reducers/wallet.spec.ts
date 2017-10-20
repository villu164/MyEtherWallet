import { wallet, INITIAL_STATE } from 'reducers/wallet';
import { IWallet } from 'libs/wallet/IWallet';
import * as walletActions from 'actions/wallet';
import Big from 'bignumber.js';
import { Ether } from 'libs/units';

describe('wallet reducer', () => {
  it('should return the initial state', () => {
    expect(wallet(undefined, {} as any)).toEqual(INITIAL_STATE);
  });

  it('should handle WALLET_SET', () => {
    const walletInstance: IWallet = { wallet: true } as any;
    expect(wallet(undefined, walletActions.setWallet(walletInstance))).toEqual({
      ...INITIAL_STATE,
      inst: walletInstance,
      balance: null,
      tokens: {}
    });
  });

  it('should handle WALLET_SET_TOKEN_BALANCES', () => {
    const tokenBalances = { OMG: new Big(20) };
    expect(
      wallet(undefined, walletActions.setTokenBalances(tokenBalances))
    ).toEqual({
      ...INITIAL_STATE,
      tokens: tokenBalances
    });
  });
});
