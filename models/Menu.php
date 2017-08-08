<?php

namespace BokkaWP\Theme\models;

class Menu
{
    private $menu;
    private $wp_menu;

    /**
     * Setup new instance of Menu class
     * @param string $name WordPress menu name
     */
    public function __construct($name) {
        $this->wp_menu = wp_get_nav_menu_object($name);
        $this->menu = Menu::setMenuItems();
    }

    /**
     * Setup array of menu links
     */
    protected function setMenuItems()
    {
        $menu_items = wp_get_nav_menu_items($this->wp_menu->term_id, array('order' => 'DESC'));
        $menu_object['links'] = array();

        foreach ($menu_items as $item) {
            $menu_item = array();
            $menu_item['link'] = $item->url;
            $menu_item['title'] = $item->title;
            $menu_item['slug'] = get_post_field('post_name', $item->object_id);

            if (!empty($item->classes) && !empty($item->classes[0])) {
                $menu_item['classes'] = $item->classes;
            }

            if (!$item->menu_item_parent) {
                $menu_object['links'][$item->ID] = $menu_item;
            } else {
                $menu_object['links'] = Menu::assignChildMenu($item, $menu_item, $menu_object['links']);
            }
        }

        return $menu_object;
    }

    /**
     * Recursively search through all menu links and find a matching parent id
     * to assign menu item to
     */
    protected function assignChildMenu($item, $menu_item, $menu_links)
    {
        if (!$item || !$menu_item || !$menu_links) {
            return false;
        }

        foreach ($menu_links as $key => $value) {
            if ($key == $item->menu_item_parent) {
                $menu_links[$key]['child_menu'][$item->ID] = $menu_item;
            } elseif (isset($value['child_menu']) && !empty($value['child_menu'])) {
                $menu_links[$key]['child_menu'] = Menu::assignChildMenu($item, $menu_item, $value['child_menu']);
            }
        }

        return $menu_links;
    }
}
