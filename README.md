# BOKKA WP Theme

This Wordpress theme is designed to provide all you need to build a highly customizable and extendable Wordpress theme that utilizes OOP practices.

## Features
 * Compatibility with most if not all WP Core features
 * BokkaMVC File Structure
 * Atomic Design File Structure
 * Gulp task runner
    * Live reload
    * Organised tasks
    * PHP Code Sniffer `PSR2` & Linting 
    * Image minification / Optimization
 * Webpack Compilation
    * Backbone
    * Lodash
 * PostCSS compilation
    * Variables 
    * Nested Styles
    * Mixins
    * Auto prefix
    * Lost Grid
    * Helper Mixins
    * Source Maps
 * Parent / Child Compatibility
 * Barebones UI features
    * Slider
    * Tabs
        
 
### Features to be added
 * SASS Compilation task
 * More documentation (possibly screencasts)
 * gulp plumber
 
## Installation
 
 Download this theme and add it to your themes directory and activate in the Wordpress Admin
 
### Child Theming
 
 Special considerations should be made when porting this into a child theme. We have a boilerplate that comes with Wordpress core, along with our typical plugins and this theme in an optimized parent/child format.
 It is recommended to use that boilerplate if you wish to use this as a child theme.
 
## Usage
 
 It's worth reading all of the documentation below to understand the Bokka WP Theme ecosystem. Things that most WP developers are used to like adding code to `functions.php` is generally a no-no and should be avoided at all costs.
 
### Requirements
 While it's not required, it is recommended you use this theme with the BokkaMVC plugin. The following documentation will assume you are using BokkaMVC.
 
### Folder Structure
Use this to give you an overview on how your app might be structured
 .
 +-- admin - `seperate admin code from front-end code`
 +-- assets - `js/css/sass/image/fonts should go here for compilation`
 |   +-- src
 +-- config - `theme level configuration files, script includes, thumbnail sizes, etc (files are autoloaded no need to include)`
 +-- controllers - `See bokkaMVC for details on controllers/naming conventions`
 +-- Gulp - `gulp configurations`
 |   +-- tasks - `custom tasks to be added in a seperate file here`
 +-- helpers `Files autoloaded by BokkaMVC, see BokkaMVC for details`
 +-- hooks `Actions/Filters go here, use individual files based on functionality(files are autoloaded no need to include)`
 +-- models `See bokkaMVC for details on models/naming conventions`
 +-- templates `See bokkaMVC for details on templates, usually all HTML goes in here via handelbars templates`
 +-- views `See bokkaMVC for details on views/naming conventions`
 +-- config.php `See BokkaMVC for details, configurations loaded globally`
 +-- gulpfile.js
 +-- index.php `Acts as our Router, see BokkaMVC for more details`
 +-- package.json
 +-- README.md
 +-- style.css
 +-- webpack.config.js

### Routing

__index.php__ - If you're familiar with other MVC environments you're likely familiar with a router. The idea is fairly simple, have a single point of entry that loads each part of the application as it's needed. More ofthen than not, these routes correlate directly to a page or data type. 

Wordpress has a built in router. If you've built custom themes before you know that you can use specific naming conventions for your files that Wordpress will automatically use in specific situations. For example `single-carrots.php` will be used to display the details of a single post of the post type `carrots`.

We don't have to use these multiple files which often clutters our our codebase. We can use core helper functions to help us set up our routes. You are likely familiar with some of these:

 * `is_front_page()`
 * `is_page()`
 * `is_singular()`
 * `is_post_type_archive()`
 * `is_404()`
 
Eventually this might translate into your `index.php` having something like the following
```
if (is_front_page()) {
    new \BokkaWP\Theme\controllers\HomeController();
}
```

__Why take this approach?__
First and foremost `index.php` is the point of entry for all themes. If all of our code is executed from a single point of entry there shouldn't be confusion as to what is running and why. Using a template filename like `single-carrots.php` allows Wordpress to create a little "magic" for us that obfuscates why and when our code is being executed.

Essentially this methodology creates a trail of breadcrumbs that will make it easier for us to debug our code in the future. While there is nothing inherently wrong with the filename methodology, it can make things confusing when a new developer dives into your codebase and has a hard time finding where your templates are loading from. All that said, this should make our themes more maintainable and extendable moving forward. `note: this theme & BokkaMVC  don't prevent you from using the filename methodology, you can use these two methodologies along side one another.`

Generally when we take this approach we'll only be loading our controllers. Our controllers are essentially the thing that controls what happens when that route is met. A controller for a page might look different than a controller for a custom post type as each needs to be handled differently. You'll want to make sure you're providing a default case as well. Generally, we have both a 404 case at the bottom of my `if/elseif` structure as well as a default `else` at the end to handle anything that we didn't catch.
```
if (is_front_page()) {
    new \BokkaWP\Theme\controllers\HomeController();
} elseif (is_404()) {
    //handle 404 here
} else {
    //handle anything else that we weren't prepared for
}
```

### Templating

At Bokka we employ a methodology called atomic design. It forces designers and developers to think of design as a system and promotes DRY practices in our front-end markup. A quick google search will provide plenty of great info on this subject that is out of scope for this documentation.

There is no single way of implementing atomic design. It's more a way of thinking than a way of doing things. BokkaMVC provides a handlebars engine implemented in PHP that allows us to __seperate our markup from business logic__. It is recommended you head over to the BokkaMVC project and read up on views to understand how our templates are utilized by our MVC structure. You may also want to check out the Handlebars.js documentation/examples.

Atomic design also allows us to create a better living/breathing style guide that designers and developers can refer to in the future.

__A little on our templating file structure__
 . templates
 +-- atoms - `These are individual HTML elements generally only utilized in a styleguide page`
 +-- molecules - `Molecules are a culmination of atoms such as a input & a button for search`
 +-- organisms - `Organisms make up multiple molecules such as a navigation & a search molecule`
 +-- pages - `Pages bring organisms together to make full page templates`
 
 __Child Theming__
 If a templates directory isn't defined in a child theme BokkaMVC will utilize a templates directory inside of a parent theme. It is recommended to copy all templates from the parent into the child as BokkaMVC will only load templates from a single location.
 
### Hooks (actions/filters)

 This theme is fully compatible with Wordpress' built in actions & filters. When you typically inherit a Wordpress project, you will likely look into functions.php and see abundant actions, filters, and includes that dictate how your application is run. This code is generally poorly organized, monolithic, and difficult to maintain. 
 We've added a hooks folder for providing more organization, but it is up to you to take it a step further. All hooks should be organized in files specific to functionality. An example might be that you have custom permalinks that hook into a filter like so `add_filter('post_type_link', 'custom_permalink_function', 10, 4);` It's probably best to put this type of code into it's own file `hooks/permalinks.php`. Once we add a file to the hooks directory it will automatically be included by our `functions.php`
 
 
### Configuration

### Controllers

### Views

### Gulp