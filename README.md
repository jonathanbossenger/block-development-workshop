#Block Development Workshop

GitHub repository for a beginner workshop to block development

## Preparation
* Local development environment
* Default WordPress install
* NodeJS installed
* Terminal access of some kind

## Step one
Set up JavaScript build tools
* Make sure npm is installed
* Set up project, run `npm init`
* Install required packages, run `npm install --save-dev --save-exact @wordpress/scripts`

## Step two (a) - start block
* Create starter block in the plugins directory, run `npx @wordpress/create-block starter-block`
* Run `npm run build` to build assets for starter plugin

## Step two (b) - custom block
* Register the block assets in PHP (https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/)
* Register the block in JavaScript
* Update package.json
* Run `npm install` to install dependencies
* Run `npm run build` to build assets or `npm run start` to watch and build
* (Tip) Make sure the block type registration is named correctly

## Step three - adding some available components, with attributes
* Add a Rich Text component with some attributes (https://developer.wordpress.org/block-editor/tutorials/block-tutorial/introducing-attributes-and-editable-fields/)
* Add a custom attribute to be saved on the block (https://developer.wordpress.org/block-editor/developers/block-api/block-attributes/)
* Add a new component to our custom block
