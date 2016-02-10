'use strict'

describe 'module:', ->

  it 'get contents of glob', (done) ->
    kls([p.join(fixtures, '*')]).then (res) ->

        {files, exes, dirs, symlinks, stats, glob} = res[0]
        resCwd = res[0].cwd
        af = p.join(cwd, fixtures) # absolute path to fixtures

        deepEqualPairs =
          [ [ files,    [ p.join(af, 'bar.txt') ] ]
          , [ exes,     [ p.join(af, 'foo.txt') ] ]
          , [ dirs,     [ p.join(af, 'dirFoo')  ] ]
          , [ symlinks, [ p.join(af, 'foo')     ] ]
          ]
        deepEqual = (pair) -> assert.deepEqual pair[0], pair[1]
        deepEqual pair for pair in deepEqualPairs

        equalPairs =
          [ [ Object.keys(stats).length, 4 ]
          , [ glob, p.join(fixtures, '*')  ]
          , [ cwd, resCwd ]
          ]
        equal = (pair) -> assert.equal pair[0], pair[1]
        equal pair for pair in equalPairs

        done()
      .catch (err) -> done err

  # it 'globify path', (done) ->
  #   kls([fixtures]).then (res) ->
