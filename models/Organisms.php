<?php

namespace BokkaWP\Theme\models;

class Organisms extends \BokkaWP\MVC\Model
{
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

        //setup boolean for basic handlebars if statement
        if (isset($organism['type'])) {
            $type = $organism['type'];

            // Reassign form data to $organism['gform']
            if ($type == 'form-basic' || $type == 'form-w-text') {
                $organism['gform'] = $organism['form'];
            }

            $organism[$type] = true;
        }

        //set a default id
        if (!isset($organism['id']) && isset($organism['type'])) {
            $organism['id'] = $organism['type'];
        }

        //only show controls if there are greater 1 items
        if (isset($organism['type']) && (
                $organism['type'] === "feature-slider" ||
                $organism['type'] === "cta-w-gallery" ||
                $organism['type'] === "slider-gallery" ||
                $organism['type'] === "text-block-w-image"
            )) {
            if (isset($organism['item']) && count($organism['item']) > 1) {
                $organism['controls'] = true;
            }
            if (isset($organism['gallery']) && count($organism['gallery']) > 1) {
                $organism['controls'] = true;
            }
        }

        //get image urls for image fields (id)
        if (isset($organism['image'])) {
            $image_id = $organism['image'];
            $size = isset($organism['image_size']) ? $organism['image_size'] : 'large';
            $organism['image'] = wp_get_attachment_image_src($image_id, $size)[0];
        }

        //recursively call this function on child items
        if (isset($organism['item']) && $organism['item']) {
            $organism['item'] = array_map(array($this, 'mapData'), $organism['item']);
        }

        return $organism;
    }
}
