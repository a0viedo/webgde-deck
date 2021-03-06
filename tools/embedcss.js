/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const CleanCSS = require('clean-css');
const process = require('process');
const replace = require('replace-in-file');
const argv = require('minimist')(process.argv.slice(2));

// Replaces the CSS that matches one very specific string with the compressed output of the input file

const inputCSSFile = [argv['i']];

const replaceLink = (css) => {
  const styles = css.styles;
  replace({
    files: 'dist/server/public/assets/templates/*.html',
    from: /<link rel="stylesheet" href="\/styles\/main.css" \/>/g,
    to: `<style nonce='style-{{= it.nonce.inlinedcss }}'>${styles}</style>`
  });
};

new CleanCSS({returnPromise: true})
    .minify(inputCSSFile)
    .then(replaceLink)
    .then(_ => console.log('CSS Replaced'));
