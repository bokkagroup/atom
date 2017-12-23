<?php

namespace CatalystWP\Atom\models;

use CatalystWP\Nucleus\models\Image as Image;

class Organisms extends \CatalystWP\Nucleus\Model
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
        if (!function_exists('get_field')) {
            return;
        }

        $post_id = isset($id) ? $id : get_the_ID();
        $organisms = get_field('organism', $post_id);

        if (is_array($organisms)) {
            $this->data = array_map(array($this, 'mapData'), $organisms);
        } else {
            $this->data = array();
        }

        //set header & footer data
        $this->data['header'] = new organisms\Header();
        $this->data['footer'] = new organisms\Footer();
    }

    /**
     * Provides various formatting to our organisms and then recursively calls itself on the organism
     * does things like gets images form their ID, generates Gform data via it's id, so on and so fourth
     * very similar to our viewFilters
     *
     * @param  array    $organism       Array of organism data from ACF fields
     * @param  string   $parentType     Parent organism type value for nested item arrays
     * @return array                    Formatted organism data
     */
    public function mapData($organism, $parentType = null)
    {
        /**
         * Set organism type property equal to true
         * for use in handlebars templates
         */
        if (isset($organism['type'])) {
            $organism[$organism['type']] = true;
        }

        /**
         * Set default organism ID property equal to the organism type.
         */
        if (empty($organism['id']) && isset($organism['type']) && !$parentType) {
            if (is_string($organism['type']) && strlen($organism['type']) > 1) {
                $this->organism_count[] = $organism['type'];
                $organism_count_values = array_count_values($this->organism_count);

                if ($organism_count_values[$organism['type']] > 1) {
                    $organism['id'] = $organism['type'] . '-' . $organism_count_values[$organism['type']];
                } else {
                    $organism['id'] = $organism['type'];
                }
            }
        }

        /**
         * Clear previously set link values for modal buttons
         */
        if (isset($organism['button_type']) && $organism['button_type'] === 'modal') {
            $organism['link'] = false;
        }

        /**
         * Prepare tabbed content
         */
        if (isset($organism['tabbed-content']) && $organism['tabbed-content'] && !empty($organism['item'])) {
            $organism['tabs'] = new organisms\TabContent($organism['item']);
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
         * Set organism columns class from column_count option
         */
        if (!empty($organism['column_count']) && !is_array($organism['column_count'])) {
            if ($organism['column_count'] === 'two') {
                $organism['column_class'] = 'col-2';
            } elseif ($organism['column_count'] === 'three') {
                $organism['column_class'] = 'col-3';
            } elseif ($organism['column_count'] === 'four') {
                $organism['column_class'] = 'col-4';
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
                    if ($organism['type'] === 'thumbnail-grid') {
                        $image['image']->setSrc('thumbnail');
                    }

                    if ($organism['type'] === 'slider-gallery') {
                        $image['image']->setSrc('large');
                        $image['title'] = null;
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
            $organism['image']->setSrc('large');

            // Organism specific modifiers
            if (isset($organism['type'])) {
                if ($organism['type'] === 'brand-window') {
                    $organism['image']->setSrc('full');
                }
            }

            if ($parentType === 'brand-window-slider') {
                $organism['image']->setSrc('large');
            }

            if (($parentType === 'content-grid-w-thumbnails-2') ||
                ($parentType === 'content-columns-3') ||
                ($parentType === 'content-columns-4')) {
                $organism['image']->setSrc('thumbnail');
            }
        }

        /**
         * Get background image object
         */
        if (!empty($organism['background_image'])) {
            $organism['background_image'] = new Image($organism['background_image']);
        }

        /**
         * Call mapData recursively on all child items
         */
        if (isset($organism['item']) && is_array($organism['item']) && !empty($organism['item'])) {
            $organism['item'] = $this->mapItemData($organism['item'], $organism['type']);
        }

        return $organism;
    }

    /**
     * Provide anonymous function for passing values to mapData function
     * @param  array  $items      Array of child fields
     * @param  string $parentType Parent organism type
     * @return array              Array of child fields run through mapData
     */
    public function mapItemData($items, $parentType)
    {
        return array_map(function ($item) use ($parentType) {
            return $this->mapData($item, $parentType);
        }, $items);
    }
}
