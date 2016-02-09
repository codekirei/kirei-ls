'use strict'

describe 'module:', ->

  it 'read dir', (done) ->
    kls(undefined, _: ['test/meta/fixtures'])
      .then (res) ->
        assert.deepEqual res.files, ['file']
        done()
      .catch (err) -> done err
