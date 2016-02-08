'use strict'

describe 'module:', ->

  it 'read dir', ->
    actual = kls(undefined, _: ['test/meta/fixtures'])
    expected = ['bar.txt', 'foo.txt']
    assert.eventually.deepEqual actual, expected
