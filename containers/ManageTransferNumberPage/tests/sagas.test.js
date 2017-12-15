/**
 * Test  sagas
 */

import expect from 'expect';
import { take, put, fork, cancel } from 'redux-saga/effects';
import { manageTransferNumberPageSaga, submitSourcesWatcher, fetchSourcesWatcher } from '../sagas';
import { LOCATION_CHANGE } from 'react-router-redux';

describe('MangeTransferNumberPageSaga Saga', () => {
  describe('mangeTransferNumberPageSaga', () => {
    const mainSaga = manageTransferNumberPageSaga();

    let forkDescriptorA;
    let forkDescriptorB;

    it('should asyncronously fork submit form watcher saga', () => {
      forkDescriptorA = mainSaga.next();
      expect(forkDescriptorA.value).toEqual(fork(fetchSourcesWatcher));
      forkDescriptorB = mainSaga.next();
      expect(forkDescriptorB.value).toEqual(fork(submitSourcesWatcher));
    });

    it('should yield until LOCATION_CHANGE action', () => {
      const takeDescriptor = mainSaga.next();
      expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
    });

    it('should finally cancel() the forked submitFormWatcher saga',
      function* referFormSagaCancellable() {
        // reuse open fork for more integrated approach
        const actualYield = mainSaga.next(put(LOCATION_CHANGE)).value;
        expect(actualYield).toEqual(cancel(forkDescriptorA));
      }
    );
  });
});
