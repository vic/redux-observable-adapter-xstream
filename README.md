# redux-observable-adapter-xstream

[![npm](https://img.shields.io/npm/v/redux-observable-adapter-xstream.svg)](https://www.npmjs.com/package/redux-observable-adapter-xstream)
[![Travis](https://img.shields.io/travis/vic/redux-observable-adapter-xstream.svg)](https://travis-ci.org/vic/redux-observable-adapter-xstream)

Use [xstream](https://github.com/saltz/xstream) with [redux-observable](https://github.com/redux-observable/redux-observable)


## Install

This requires peer dependencies of `rxjs@5` and `xstream`, which will have to be installed as well.

```sh
npm install --save redux-observable-adapter-xstream
```

## Usage

This library basically will convert the RxJS `ActionsObservable` provided to your Epics into a xstream version. Then the xstream you return in your Epic will be converted back to an RxJS Observable inside the middleware.

```js
import xstreamAdapter, {ofType} from 'redux-observable-adapter-xstream';

const epicMiddleware = createEpicMiddleware(rootEpic, { adapter: xstreamAdapter });

// your Epics are now xstreams

const pingPongEpic = action$ =>
  action$
    .filter(ofType(PING))
    .map(action => ({
      type: PONG
    }));
```

