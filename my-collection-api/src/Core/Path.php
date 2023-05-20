<?php

namespace MyCollectionApi\Core;

class Path 
{
    private string $dir;

    private string $env;

    public function __construct(string $env, string $basedir)
    {
        $this->env = $env;
        $this->dir = $basedir;
    }

    public function getCongigPath(): string
    {
        return $this->dir . '/config/' . $this->env . '.json'; 
    }
}