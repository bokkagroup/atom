<?php
use BokkaWP\Theme\controllers\OrganismsController;

//Determine which controller to use
if (is_singular('communities')) {
} elseif (is_singular('plans')) {
} elseif (is_singular('model')) {
} elseif (is_singular('home')) {
} elseif (is_front_page()) {
} elseif (is_page()) {
    new OrganismsController();
} elseif (is_post_type_archive()) {
} elseif (is_tax()) {
} elseif (is_archive()) {
} elseif (is_single()) {
} elseif (is_category()) {
} elseif (is_404()) {
} else {
}
