## Overview

The Bokka WordPress theme is designed to be a tool for building extendable, modular WordPress themes in an efficient and logical manner. The theme is intended to be used with the BokkaMVC plugin, allowing us to use a MVC structure to separate our data from templates and therefore develop cleaner code for greater readability and maintainability.

The theme is built with the following core principles in mind:
- Don’t Repeat Yourself: a principle of software development, stated as "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.”
- Separation of concerns: code should be organized such that each piece aims to address a specific, separate concern.

To get the most out of this theme, you’ll want to familiarize yourself with the main methodologies we use:
- MVC
- Atomic design http://bradfrost.com/blog/post/atomic-web-design/

### Features
- Compatibility with most, if not all, WP Core features
- BokkaMVC file structure
- Atomic design file structure
- Gulp task runner
  - Livereload
  - PHP Code Sniffer (PSR2) & linting
  - Organized tasks
  - Image minification/optimization
  Future: JavaScript linting
- Webpack compilation
  - Backbone
- PostCSS compilation
  - Variables
  - Nested styles
  - Mixins
  - Autoprefixing
  - Minification (cssnano)
  - Style linting
  - Source maps
- Future: bare-bones UI elements (organisms)

### File Structure

`admin/` - separate admin code from front-end code

`assets/` - js/css/sass/image/fonts should go here for compilation into the build folder_

`|--build/`

`|--src/`

`config/` - theme level configuration files, script includes, thumbnail sizes, etc (files are autoloaded by BokkaMVC, no need to include)

`controllers/` - see BokkaMVC for details on controllers/naming conventions

`controllers/`

`gulp/` - gulp configurations

`|--tasks/` - custom tasks to be added in a separate file here

`|--utility/`

`helpers/` - files autoloaded by BokkaMVC, see BokkaMVC for details

`hooks/` - actions/filters go here – use individual files based on functionality (files are autoloaded by BokkaMVC, no need to include)

`models/` - see BokkaMVC for details on models/naming conventions

`templates/` - see BokkaMVC for details on templates. Usually all HTML goes in here via Handlebars templates

`views/` - see BokkaMVC for details on views/naming conventions

`config.php` - see BokkaMVC for details, configurations loaded globally

`gulpfile.js`

`index.php` - acts as our router, see BokkaMVC for more details

`package.json`

`README.md`

`style.css` - used only to provide theme details to WordPress (your custom theme styles should go in `/assets`)

`webpack.config.js`

## Requirements

This theme is part of an ecosystem made up of a couple of plugins designed to provide an MVC type of experience while developing your WordPress themes. That being said, this theme should be compatible with most WordPress plugins.

* **PHP** - Minimum 5.3.0 and above, recommended 7. We encourage the use of namespacing and autoloaders, which are not available in earlier versions of PHP. We also encourage the use of PSR linting.

* [**Node.js**](https://nodejs.org/en/)/[**npm**](https://www.npmjs.com/) -  Node 6.2.0 and greater, npm 2.15.9 and greater. We rely on npm to provide all of our packages for linting, JS/CSS concatenation and interpretation. npm will install everything you need to get running, like gulp and webpack.

* [**WordPress**](https://wordpress.org/) - Recommended 4.7 and above. Our framework goes against most WordPress conventions and instead encourages conventions used by the greater PHP community. However, it was built with WordPress compatibility in mind and should work fine with WordPress 3.0. It should also work just fine with all/most WordPress conventions, although it wasn't designed for migrating old themes to the MVC theme. You're likely to be using this for the creation of new projects, for which we recommend using the latest version of WordPress.

* [**Bokka WP MVC**](https://github.com/bokkagroup/bokka-wp-mvc) - This plugin provides base classes and autoloaders necessary for this theme to work. Best installed as a [must-use plugin](https://codex.wordpress.org/Must_Use_Plugins).

* [**Bokka Utilities**](https://github.com/bokkagroup/bokka-wp-utilities) - This plugin provides some utilities that will make your development a lot easier. While not a hard requirement, it may become one in the future and is recommended. Best installed as a must-use plugin.

### Recommended environment

We use [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) for our local development environment. This reflects what we run most frequently in production.

We've also created a BASH script that you can use to generate site configurations for VVV and to scaffold MVC classes. If you don't want to use VVV, the scaffolding will still work, provided you use a similar directory structure. You can install this BASH script with the following command:

```
curl -O https://gist.githubusercontent.com/mikemcguire/2bf24827b89048339589accd35326d91/raw/631f0cd76ac17fc59d3c8d23b187523a78bbfc4d/bokka && chmod +x bokka && sudo mv bokka /usr/local/bin
```

### Recommended Plugins

While the MVC environment should be compatible with most plugins, we haven't tested all plugins. Even assuming compatibility, using certain plugins might be different than how you're accustomed to using them. Below is a list of third-party plugins that we've used with the MVC structure successfully (not sponsored).

* [**Gravity Forms**](http://www.gravityforms.com/) - It is best to [embed](https://www.gravityhelp.com/documentation/article/embedding-a-form/) your Gravity Form by assigning the HTML as a member of a model. Using the `gravity_form` function call and providing a false value for the `$echo` parameter the function will just return your HTML.

* [**ACF Pro**](https://www.advancedcustomfields.com/pro/) - ACF is what we use to extend our data capabilities in WordPress. Our MVC plugi, n provides functionality that automatically attaches ACF fields to your model so you no longer have to call things like `get_field`. However, you may need to do additional data manipulation for fields like repeaters inside your model to make the data usable for your view.

---

### Features to be added
 * SASS Compilation task
 * More documentation (possibly screencasts)
 * gulp plumber
 
## Installation
 
 Download this theme and add it to your themes directory and activate in the WordPress Admin
 
### Child Theming
 
 Special considerations should be made when porting this into a child theme. We have a boilerplate that comes with WordPress core, along with our typical plugins and this theme in an optimized parent/child format.
 It is recommended to use that boilerplate if you wish to use this as a child theme.
 
## Usage
 
 It's worth reading all of the documentation below to understand the Bokka WP Theme ecosystem. Things that most WP developers are used to like adding code to `functions.php` is generally a no-no and should be avoided at all costs.
 

### Routing

__index.php__ - If you're familiar with other MVC environments you're likely familiar with a router. The idea is fairly simple, have a single point of entry that loads each part of the application as it's needed. More ofthen than not, these routes correlate directly to a page or data type. 

WordPress has a built in router. If you've built custom themes before you know that you can use specific naming conventions for your files that WordPress will automatically use in specific situations. For example `single-carrots.php` will be used to display the details of a single post of the post type `carrots`.

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
First and foremost `index.php` is the point of entry for all themes. If all of our code is executed from a single point of entry there shouldn't be confusion as to what is running and why. Using a template filename like `single-carrots.php` allows WordPress to create a little "magic" for us that obfuscates why and when our code is being executed.

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

 This theme is fully compatible with WordPress' built in actions & filters. When you typically inherit a WordPress project, you will likely look into functions.php and see abundant actions, filters, and includes that dictate how your application is run. This code is generally poorly organized, monolithic, and difficult to maintain. 
 We've added a hooks folder for providing more organization, but it is up to you to take it a step further. All hooks should be organized in files specific to functionality. An example might be that you have custom permalinks that hook into a filter like so `add_filter('post_type_link', 'custom_permalink_function', 10, 4);` It's probably best to put this type of code into it's own file `hooks/permalinks.php`. Once we add a file to the hooks directory it will automatically be included by our `functions.php`
 
 
### Configuration

### Controllers

### Views

### Gulp