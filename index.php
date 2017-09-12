<?php
use BokkaWP\Theme\controllers\PostController;
use BokkaWP\Theme\controllers\ArchiveController;
use BokkaWP\Theme\controllers\BuilderUpdateFormController;
use BokkaWP\Theme\controllers\OrganismsController;
use \BokkaWP\Theme\controllers\SpecialPageController;

//Determine which controller to use
if (get_query_var('token', false) && get_query_var('builder_form', false)) {
    new BuilderUpdateFormController();
} elseif (get_query_var('json', false)) {
    new  ArchiveController(array('json'=>true));
} elseif (get_query_var('default_blog_page_slug', false)) {
    new SpecialPageController();
} elseif (is_page('contact-us')) {
} elseif (is_singular('communities')) {
} elseif (is_singular('plans')) {
} elseif (is_singular('model')) {
} elseif (is_singular('home')) {
} elseif (is_page('contact-us')) {
} elseif (is_front_page()) {
    new ArchiveController();
} elseif (is_page()) {
    new OrganismsController();
} elseif (is_post_type_archive()) {
} elseif (is_tax()) {
} elseif (is_archive()) {
} elseif (is_single()) {
    new PostController();
} elseif (is_category()) {
} elseif (is_404()) {
} else {
}
