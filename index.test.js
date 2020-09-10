const t = require('tap');
const sinon = require('sinon');

const onPostBuild = require('./index.js').onPostBuild;

t.test('calls utils.run with defaults', async (t) => {
  const run = sinon.fake();
  await onPostBuild({
    inputs: { ext: 'html' },
    constants: { PUBLISH_DIR: '_site'},
    utils: { run }
  });

  const expected = ['html-validate', ['--ext', 'html', '_site']];
  const actual = run.getCall(0).args;
  
  t.sameStrict(actual, expected, 'Function called with incorrect parameters');
});

t.test('overwrites config path', async (t) => {
  const run = sinon.fake();
  await onPostBuild({
    inputs: { ext: 'html', config: 'config.json' },
    constants: { PUBLISH_DIR: '_site'},
    utils: { run }
  });

  const expected = ['html-validate', ['--config', 'config.json', '--ext', 'html', '_site']];
  const actual = run.getCall(0).args;
  
  t.sameStrict(actual, expected, 'Function called with incorrect parameters');
});

t.test('catches validation error', async (t) => {
  const error = new Error('Something is wrong');
  error.exitCode = 1;
  const run = () => { throw error; }
  const failBuild = (msg, err) => ({msg, err})

  const actual = await onPostBuild({
    inputs: { ext: 'html' },
    constants: { PUBLISH_DIR: '_site'},
    utils: { run, build: { failBuild } }
  });

  const expected = {
    msg: 'Invalid HTML',
    err: { error }
  }
  t.sameStrict(actual, expected);
});

t.test('catches unkown error', async (t) => {
  const error = new Error('Something is wrong');
  const run = () => { throw error; }
  const failBuild = (msg, err) => ({msg, err})

  const actual = await onPostBuild({
    inputs: { ext: 'html' },
    constants: { PUBLISH_DIR: '_site'},
    utils: { run, build: { failBuild } }
  });

  const expected = {
    msg: 'Unknown error',
    err: { error }
  }
  t.sameStrict(actual, expected)
});
