<?php
namespace Botble\LogViewer;

use Botble\Base\Interfaces\PluginInterface;
use Botble\Base\Supports\Commands\Permission;

class Plugin implements PluginInterface
{

    /**
     * @return array
     * @author Sang Nguyen
     */
    public static function permissions()
    {
        return [
            [
                'name' => 'Logs list',
                'flag' => 'logs.list',
                'is_feature' => true
            ],
            [
                'name' => 'Delete',
                'flag' => 'logs.delete',
                'parent_flag' => 'logs.list'
            ]
        ];
    }

    /**
     * @author Sang Nguyen
     */
    public static function activate()
    {
        $permissions = self::permissions();
        Permission::registerPermission($permissions);
    }

    /**
     * @author Sang Nguyen
     */
    public static function deactivate()
    {

    }

    /**
     * @author Sang Nguyen
     */
    public static function remove()
    {
        $permissions = self::permissions();
        Permission::removePermission($permissions);
    }
}