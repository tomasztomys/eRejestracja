<?php

const CORE_PATH = ".";

class AutoLoad
{
    public static function run()
    {
        spl_autoload_register(function($className)
        {
            $namespace=str_replace("\\","/",__NAMESPACE__);
            $className=str_replace("\\","/",$className);
            $class=CORE_PATH."/classes/".(empty($namespace)?"":$namespace."/")."{$className}.php";
            include_once($class);
        });
    }
}