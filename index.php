<?php
get_template_part('templates/head');
get_template_part('templates/header');
do_action('bokkawptheme_before_content'); ?>

    <div id="content" class="content">
        <?php

        //Determine which controller to use
        if (is_front_page()) {
        } elseif (is_page('contact-us')) {
        } elseif (is_singular('communities')) {
        } elseif (is_singular('plans')) {
        } elseif (is_singular('model')) {
        } elseif (is_singular('home')) {
        } elseif (is_page('contact-us')) {
        } elseif (is_post_type_archive()) {
        } elseif (is_tax()) {
        } elseif (is_archive()) {
        } elseif (is_single()) {
        } elseif (is_category()) {
        } elseif (is_404()) {
        } else {
        }
        ?>
    </div><!--/content-->

<?php do_action('bokkawptheme_after_content');
get_template_part('templates/footer');

?>
