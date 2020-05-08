# generator-starter

Blank Adobe Generator plugin.

## Usage

Download and `npm install` both this repository and [`generator-core`](https://github.com/adobe-photoshop/generator-core).

Place this very repository in a `plugins` folder aside to `generator-core`, so that:

```text
.
├── generator-core
│   └── ... stuff
└── plugins
    └── generator-starter
        └── ... stuff
```

`cd` in `generator-core` and `node --inspect ../../generator-core/app -f ../ -v` to run the plugin
