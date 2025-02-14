#!/usr/bin/env node

const esbuild = require('esbuild')
const copyStaticFiles = require('esbuild-copy-static-files')

esbuild.build({
  entryPoints: ['./src/init.tsx'],
  outfile: './dist/out.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [
    copyStaticFiles({
      src: './static',
      dest: './dist',
      dereference: true,
      errorOnExist: false,
      preserveTimestamps: true,
      recursive: true,
    })
  ]
})
.catch(() => process.exit(1));
