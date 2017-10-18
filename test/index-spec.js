/* globals describe it */
import 'babel-polyfill';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { toArray } from 'rxjs/operator/toArray';
import xs from 'xstream';
import adapter, { ofType } from '../';

const streamToArray = x$ => new Promise(resolve => {
  x$.fold((a, i) => a.concat(i), []).last().addListener({next: resolve})
});

describe('adapter', () => {
  it('should convert input to xstream', (done) => {
    const observable = Observable::of(1, 2, 3);
    const stream = adapter.input(observable);

    expect(stream).to.have.property('compose')
    streamToArray(stream)
      .then(value => {
        expect(value).to.deep.equal([1, 2, 3]);
        done();
      });
  });

  it('should convert output to RxJS v5 Observable', (done) => {
    const stream = xs.fromArray([1, 2, 3]);
    const observable = adapter.output(stream);

    expect(observable).to.be.an.instanceof(Observable);

    observable::toArray().subscribe(value => {
      expect(value).to.deep.equal([1, 2, 3]);
      done();
    });
  });
});

describe('ofType', () => {
  it('should filter by action type', () => {
    const action$ = xs.fromArray([{ type: 'A' }, { type: 'B' }, { type: 'A' }]);
    return streamToArray( action$.filter(ofType('A')) )
      .then(value => {
        expect(value).to.deep.equal([
          { type: 'A' },
          { type: 'A' }
        ]);
      });
  });
});
