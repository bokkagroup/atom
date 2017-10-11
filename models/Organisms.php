<?php

namespace BokkaWP\Theme\models;

use BokkaWP\helpers\Image as Image;

class Organisms extends \BokkaWP\MVC\Model
{
    /**
     * Prepare post data for view
     * @param  int $id WordPress Post ID
     */
    public function initialize($id)
    {
        $post_id = isset($id) ? $id : get_the_ID();
        $organisms = get_field('organism', $post_id);

        if (is_array($organisms)) {
            //recursively loop through our array
            $this->data = array_map(array($this, 'mapData'), $organisms);
        } else {
            $this->data = array();
        }
    }

    /**
     * Provides various formatting to our organisms and then recursively calls itself on the organism
     * does things like gets images form their ID, generates Gform data via it's id, so on and so fourth
     * very similar to our viewFilters
     * @param $organism
     * @return array
     */
    public function mapData($organism)
    {
        /**
         * Set organism type property equal to true
         * for use in handlebars templates
         */
        if (isset($organism['type'])) {
            $type = $organism['type'];

            $organism[$type] = true;
        }

        /**
         * Set default organism ID property equal to the organism type
         *
         * TODO: Generate unique IDs if an organism is used multiple times on the page
         */
        if (empty($organism['id']) && isset($organism['type'])) {
            $organism['id'] = $organism['type'];
        }

        /**
         * Allows gallery controls to show only if there is more than 1 item
         */
        if (isset($organism['type']) && (
                $organism['type'] === "slider-gallery"
            )) {
            if (isset($organism['item']) && count($organism['item']) > 1) {
                $organism['controls'] = true;
            }
            if (isset($organism['gallery']) && count($organism['gallery']) > 1) {
                $organism['controls'] = true;
            }
        }

        /**
         * Get Gravity Form object from form ID
         */
        if (!empty($organism['form'])) {
            if (!empty($organism['form_id']) && function_exists('gravity_form')) {
                $form = gravity_form($organism['form_id'], false, false, false, null, $ajax = true, 0, false);
                $organism['gform'] = $form;
            }
        }

        /**
         * Set organism media_type property equal to true
         * for use in handlebars templates
         */
        if ((isset($organism['type']) && $organism['type'] === 'cta-w-multimedia') && (!empty($organism['media_type']))) {
            $organism[$organism['media_type']] = true;
        }

        /**
         * Get image data from attacment ID
         */
        if (!empty($organism['image'])) {
            $image_id = $organism['image'];
            $organism['image'] = new Image($image_id);
            $organism['image']->setSrc('large');
        }

        /**
         * Call mapData recursively on all child items
         */
        if (isset($organism['item']) && !empty($organism['item'])) {
            $organism['item'] = array_map(array($this, 'mapData'), $organism['item']);
        }

        return $organism;
    }
}
