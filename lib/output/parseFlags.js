'use strict'

// jsdoc
function parseFlags(flags) {

  // build base props from defaults
  //----------------------------------------------------------
  const defaults =
    { colors:
      { headings: 'red'
      , symbols: 'white'
      , dirs: 'blue'
      , files: 'white'
      , exes: 'green'
      , symlinks: 'yellow'
      }
    , sort: 'ext'
    , columns: true
    , detail: true
    , group: true
    , relative: true
    , symbols: true
    , filters: []
    }
  const props = Object.assign({}, defaults)

  // handle filters
  //----------------------------------------------------------
  const filterMap =
    [ ['d', 'dirs']
    , ['e', 'exes']
    , ['f', 'files']
    , ['l', 'links']
    ]
  filterMap.forEach(ar => {
    const type = ar[1]
    if (flags[ar[0]] || flags[type]) props.filters.push(type)
  })

  // handle sorts
  //----------------------------------------------------------
  const sorts =
    { age: true
    , ext: true
    , name: true
    , size: true
    }
  if (sorts[flags.s]) props.sort = flags.s
  if (sorts[flags.sort]) props.sort = flags.sort

  // handle presentation flags
  //----------------------------------------------------------
  const presentationMap =
    [ ['1', 'columns']
    , ['C', 'colors']
    , ['D', 'detail']
    , ['G', 'group']
    , ['R', 'relative']
    , ['S', 'symbols']
    ]
  presentationMap.forEach(ar => {
    const key = ar[1]
    if (flags[ar[0]] || flags[key] === false) props[key] = false
  })

  // return constructed props
  //----------------------------------------------------------
  return props
}

// export
//----------------------------------------------------------
module.exports = parseFlags
