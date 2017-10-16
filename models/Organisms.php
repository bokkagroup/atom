<?php

namespace BokkaWP\Theme\models;

use BokkaWP\helpers\Image as Image;

class Organisms extends \BokkaWP\MVC\Model
{
    /**
     * Keep track of organisms on page for unique ID attributes
     * @var array
     */
    private $organism_count = array();

    /**
     * Prepare post data for view
     * @param  int $id WordPress Post ID
     */
    public function initialize($id)
    {
        $post_id = isset($id) ? $id : get_the_ID();
        $organisms = get_field('organism', $post_id);

        if (is_array($organisms)) {
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
         * Set default organism ID property equal to the organism type.
         */
        if (empty($organism['id']) && isset($organism['type'])) {
            $this->organism_count[] = $organism['type'];

            $organism_count_values = array_count_values($this->organism_count);

            if ($organism_count_values[$organism['type']] > 1) {
                $organism['id'] = $organism['type'] . '-' . $organism_count_values[$organism['type']];
            } else {
                $organism['id'] = $organism['type'];
            }
        }

        /**
         * Get Gravity Form object from form ID
         *
         * Use {{{gform}}} within template to render form
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
         * Loop through all images in gallery and get attachment data
         */
        if (!empty($organism['gallery'])) {
            $organism['gallery'] = array_map(function ($image) use ($organism) {
                $image['image'] = new Image($image['id']);

                // Organism specific modifiers
                if (isset($organism['type'])) {
                    if ($organism['type'] === 'cta-w-multimedia') {
                        $image['image']->setSrc('thumbnail');
                    }

                    if ($organism['type'] === 'slider-gallery') {
                        $image['image']->setSrc('medium');
                        $image['title'] = null;
                    }

                    if ($organism['type'] === 'thumbnail-grid') {
                        $image['image']->setSrc('thumbnail');
                    }
                }

                return $image;
            }, $organism['gallery']);
        }

        /**
         * Get image/background image data from attachment ID
         */
        if (!empty($organism['image'])) {
            $organism['image'] = new Image($organism['image']);
            $organism['image']->setSrc('large'); // TODO: remove, for testing only
        }

        if (!empty($organism['background_image'])) {
            $organism['background_image'] = new Image($organism['background_image']);
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
