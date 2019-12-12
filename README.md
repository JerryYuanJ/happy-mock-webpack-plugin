# Happy-Mock-Webpack--Plugin

This plugin provides a simple way to mock your data via webpack and webapck-dev-server. You can easily mock your own data
with just a little configuration.

> Note that currently this plugin only supports `GET` method.

## Install

```bash
npm install happy-mock-webpack-plugin
```

## Usage

In webpack config file, add this plugin instance:

```js
const HappyMockMockPlugin = require('happy-mock-webpack-plugin')
const path = require('path')

module.exports = {
  // other configs
  plugins: [
    // other plugins...
    new HappyMockMockPlugin({
      root: path.resolve(__dirname, 'mock'),
      lazy: true,
      autoRefresh: true
    })
  ]
}
```

### Mock files

directory example:

```
- src
  - app.js
- mock
  - user
    - profile.json
    - orders.js
  - menu.js
```

The directory path is the request url, for example, if you use `axios`, `axios.get('/user/profile')` will lead you to `/mock/user/profile.json`. There're some mock examples 


- /mock/user/orders.js

This file exports a function, it takes `request` and `response` as args, these two are from `webpack-dev-server` which are `express` request and response objects. You can return different content via 
different request params.

```js
module.exports = (request, response) => {
  // handle request ...
  // modify response ...
  return {
    data: []
  }
}
```

- /mock/user/profile.json

```json
{
  "name": "John Doe"
}

```

- /mock/menu.js
```js
module.exports = {
  items: [],
  from: 'xx'
}

```

Other files will be returned as it is.


### Configurations

- **root**

  `String`

  The directory that you want to put your mock files to. It **must be an absolute path**

- **lazy**

  `Boolean`

  If it's true, the file will be loaded only when there's request to it. In this case, the request takes longer but app starts faster than the other case.
  
  If it's false, the app will get all mock files and cache it, so the app starts slower, but the request is faster via the cache.


- **autoRefresh**

  `Boolean`

  If you set it to `true`, every time you change your mock files, the browser will automatically refresh to make sure you can get the lateset data. If it's `false`, you need to refresh the browser by yourself to make it.

  > Note: this field works only when `lazy=true`, otherwise the cache will take priority


## LICENSE

[MIT](./LICENSE)