import test from 'ava';
import {
  InvalidArgumentError
} from 'typedeck';

test('invalid argument error contains text Invalid Argument', async t => {
  const invalidArgumentError = new InvalidArgumentError();
  t.true(invalidArgumentError.message.indexOf('Invalid Argument:'), 'Error description did not contain "Invalid Argument"');
});

test('invalid argument error can be passed an optional message', async t => {
  const sampleMessage = 'abc123';
  const invalidArgumentError = new InvalidArgumentError(sampleMessage);
  t.true(invalidArgumentError.message.indexOf(sampleMessage), `Error description did not contain "${sampleMessage}"`);
});
