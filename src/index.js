import xs from 'xstream';
import { from } from 'rxjs/observable/from';

export const ofType = (...keys) => {
  return action => {
    const type = action.type;
    const len = keys.length;

    if (len === 1) {
      return type === keys[0];
    } else {
      for (let i = 0; i < len; i++) {
        if (keys[i] === type) {
          return true;
        }
      }
    }
    return false;
  };
};

export default {
  input: input$ => xs.fromObservable(input$),
  output: output$ => from(output$)
};
