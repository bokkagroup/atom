<?php

namespace CatalystWP\Theme\models;

class TabContent extends \CatalystWP\MVC\Model
{
    /**
     * Tab content
     * @var array
     */
    public $items;

    /**
     * Tab labels/links
     * @var array
     */
    public $tabs;

    /**
     * Set up tab data
     * @param  array  $items Tab content date
     */
    public function initialize($items = array())
    {
        $this->items = $items;
        $this->setTabs();
        $this->setContentID();
    }

    /**
     * Set tab labels
     */
    protected function setTabs()
    {
        $tabs = array();

        foreach ($this->items as $item) {
            $tabs[] = array(
                'label' => $item['title'],
                'slug' => self::getSlug($item['title'])
            );
        }

        $this->tabs = $tabs;
    }

    /**
     * Set ID value to match tab label slug/anchor value
     */
    protected function setContentID()
    {
        $this->items = array_map(function ($item) {
            $item['id'] = self::getSlug($item['title']);
            return $item;
        }, $this->items);
    }

    /**
     * Get tab slug for use as anchor value
     * @param  string $title Tab title
     * @return string        Title as lowercase, hyphen separated slug value
     */
    private function getSlug($title)
    {
        //make lowercase
        $slug = strtolower($title);
        //make alphanumeric
        $slug = preg_replace("/[^a-z0-9_\s-]/", "", $slug);
        //convert whitespaces and underscore to dash
        $slug = preg_replace("/[\s_]/", "-", $slug);

        return $slug;
    }
}
