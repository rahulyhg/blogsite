<?php

namespace Botble\Widget\Facades;

use Botble\Widget\WidgetGroup;
use Illuminate\Support\Facades\Facade;

class WidgetFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'botble.widget';
    }

    /**
     * Get the widget group object.
     *
     * @param $name
     *
     * @return WidgetGroup
     */
    public static function group($name)
    {
        return app('botble.widget-group-collection')->group($name);
    }
}
