
import sinon from 'sinon';
let clock;

before(()=> {
  clock = sinon.useFakeTimers(new Date(2016,2,15).getTime());
});

after(()=> {
  clock.restore();
});
