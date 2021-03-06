<?php

namespace Botble\Widget\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem as File;
use League\Flysystem\MountManager;
use League\Flysystem\Adapter\Local as LocalAdapter;
use League\Flysystem\Filesystem as Flysystem;
use Symfony\Component\Console\Input\InputArgument;

class WidgetCreateCommand extends Command
{

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'widget:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new widget';

    /**
     * @var File
     */
    protected $files;

    /**
     * Create a new command instance.
     *
     * @param \Illuminate\Filesystem\Filesystem $files
     * @author @author Sang Nguyen
     */
    public function __construct(File $files)
    {

        $this->files = $files;

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return boolean
     * @author Sang Nguyen
     */
    public function fire()
    {

        if ($this->files->isDirectory($this->getPath())) {
            $this->error('Widget "' . $this->getWidget() . '" is already exists.');
            return false;
        }

        // Directories.
        $this->publishStubs();

        $this->searchAndReplaceInFiles();
        $this->renameFiles($this->getPath());

        $this->info('Widget "' . $this->getWidget() . '" has been created.');
        return true;
    }

    /**
     * Generate the module in Modules directory.
     * @author Sang Nguyen
     */
    private function publishStubs()
    {
        $from = base_path('core/widget/stubs');

        if ($this->files->isDirectory($from)) {
            $this->publishDirectory($from, $this->getPath());
        } else {
            $this->error('Can’t locate path: <' . $from . '>');
        }
    }

    /**
     * Publish the directory to the given directory.
     *
     * @param string $from
     * @param string $to
     * @return void
     * @author Sang Nguyen
     */
    protected function publishDirectory($from, $to)
    {
        $manager = new MountManager([
            'from' => new Flysystem(new LocalAdapter($from)),
            'to' => new Flysystem(new LocalAdapter($to)),
        ]);

        foreach ($manager->listContents('from://', true) as $file) {
            if ($file['type'] === 'file' && (!$manager->has('to://' . $file['path']) || $this->option('force'))) {
                $manager->put('to://' . $file['path'], $manager->read('from://' . $file['path']));
            }
        }
    }

    /**
     * Search and replace all occurrences of ‘Module’
     * in all files with the name of the new module.
     * @author Sang Nguyen
     */
    public function searchAndReplaceInFiles()
    {

        $path = $this->getPath();

        $manager = new MountManager([
            'directory' => new Flysystem(new LocalAdapter($path)),
        ]);

        foreach ($manager->listContents('directory://', true) as $file) {
            if ($file['type'] === 'file') {
                $content = str_replace(['{widget}', '{Widget}',], [strtolower($this->getWidget()), studly_case($this->getWidget())], $manager->read('directory://' . $file['path']));
                $manager->put('directory://' . $file['path'], $content);
            }
        }
    }

    /**
     * Rename models and repositories.
     * @param $location
     * @return boolean
     * @author Sang Nguyen
     */
    public function renameFiles($location)
    {
        $paths = scan_folder($location);
        if (empty($paths)) {
            return false;
        }
        foreach ($paths as $path) {
            $path = $location . DIRECTORY_SEPARATOR . $path;

            $newPath = $this->transformFilename($path);
            rename($path, $newPath);

            $this->renameFiles($newPath);
        }
        return true;
    }

    /**
     * Rename file in path.
     * @param $path
     * @return string
     * @author Sang Nguyen
     */
    public function transformFilename($path)
    {

        return str_replace(
            ['{widget}', '{Widget}', '.stub'],
            [$this->getWidget(), studly_case($this->getWidget()), '.php',],
            $path
        );
    }


    /**
     * Get the destination view path.
     *
     * @return string
     * @author Sang Nguyen
     */
    protected function getPath()
    {
        return public_path(config('theme.themeDir')) . DIRECTORY_SEPARATOR . setting('theme') . '/widgets/' . $this->getWidget();
    }

    /**
     * Get the theme name.
     *
     * @return string
     * @author Sang Nguyen
     */
    protected function getWidget()
    {
        return strtolower($this->argument('name'));
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     * @author Sang Nguyen
     */
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'Name of the theme to generate.'],
        ];
    }
}