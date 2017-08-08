<?php

namespace BokkaWP\Theme\models;

class Menu
{
    public $links;
    public $wp_menu;

    /**
     * Setup new instance of Menu class
     * @param string $name WordPress menu name
     */
    public function __construct($name) {
        $this->wp_menu = wp_get_nav_menu_object($name);
        $this->links = Menu::setMenuItems();
    }

    /**
     * Setup array of menu links
     */
    protected function setMenuItems()
    {
        $menu_items = wp_get_nav_menu_items($this->wp_menu->term_id, array('order' => 'DESC'));
        $menu_object = array();

        foreach ($menu_items as $item) {
            $menu_item = array();
            $menu_item['link'] = $item->url;
            $menu_item['title'] = $item->title;
            $menu_item['slug'] = get_post_field('post_name', $item->object_id);

            if (!empty($item->classes) && !empty($item->classes[0])) {
                $menu_item['classes'] = $item->classes;
            }

            if (!$item->menu_item_parent) {
                $menu_item['parent'] = true;
                $menu_object[$item->ID] = $menu_item;
            } else {
                $menu_item['child'] = true;
                $menu_object = Menu::assignChildMenu($item, $menu_item, $menu_object);
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
                $menu_links[$key]['parent'] = true;
                $menu_links[$key]['child_menu'][$item->ID] = $menu_item;
            } elseif (isset($value['child_menu']) && !empty($value['child_menu'])) {
                $menu_links[$key]['child_menu'] = Menu::assignChildMenu($item, $menu_item, $value['child_menu']);
            }
        }

        return $menu_links;
    }

    /**
     * Apply an anonymous callback function to all links in the menu
     */
    public function updateMenuItems($callback, $menu_links = null)
    {
        $is_child = false;

        if (!$menu_links) {
            $menu_links = $this->links;
        } else {
            $is_child = true;
        }

        foreach($menu_links as $key => $value) {
            $menu_links[$key] = $callback($value, $key);

            if (isset($value['child_menu'])) {
                $menu_links[$key]['child_menu'] = Menu::updateMenuItems($callback, $value['child_menu']);
            }
        }

        if (!$is_child) {
            $this->links = $menu_links;
        } else {
            return $menu_links;
        }
    }
}
