# Webpack-Define-Loader

this loader can provide your code(js/ts/...) the ability of c style conditional compilation

## Installation

this loader requires __node version >= 4__

* npm
```
npm install webpack-define-loader --save-dev
```
* or use yarn
```
yarn add webpack-define-loader --dev
```


## Example:
```js
//webpack2 config
{
    //...
    module: {
        rules: [
            test: /\.(js|jsx|vue)$/,
            loader: 'webpack-define-loader',
            options: {
                DEBUG: true,
                PLATFORM: 'pc'
            },
            enforce: 'pre',
            exclude: /node_modules/
        ]
    }
    //...
}

```

```js
/*
 * code file
 * conditional compilation begin with `///`
 * condition after #if and #elif directive can be any legal js expression
 */

/// #if DEBUG
import parse from './parse.debug'
/// #else
import parse from './parse.release'
/// #endif

/// #if PLATFORM==='pc'
import render from './render.pc'
/// #elif PLATFORM==='mb'
import render from './render.mb'
/// #else
import render from './render.common'
/// #endif
```

## License

MIT

