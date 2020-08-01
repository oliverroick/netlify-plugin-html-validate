# netlify-plugin-html-validate

`netlify-plugin-html-validate` adds the ability to validate HTML generated by your Netlify build using [`html-validate`](https://www.npmjs.com/package/html-validate).

## Setup

### Install the plugin as a dependency to your repository

```sh
npm i --s netlify-plugin-html-validate
```

### Configure the plugin in `netlify.toml`

```toml
[[plugins]]
  package = "netlify-plugin-html-validate"

  [plugins.inputs]
    ext = "html"
    config = ".htmlvalidate.json"
```

The following parameters can be used for `plugin.inputs`

| Parameter | Description                                                                                                                  | required | default |
|-----------|------------------------------------------------------------------------------------------------------------------------------|----------|---------|
| `ext`     | The file-name extension that identifies HTML files                                                                           | no       | `html`  |
| `config`  | Configuration for `html-validate`; e.g. `.htmlvalidate.json`. If left blank, `html-validate`'s default options will be used. | no       |         |

### Configure validation rules for `html-validate`

To specify the validation rule set used by `html-validate`, setup a local configuration file, i.e. `.htmlvalidate.json`. Follow `html-validate`'s [configuration usage guide](https://html-validate.org/usage/index.html#configuration) to customise your rules.
