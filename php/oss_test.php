<?php
/***************************************************************************
 * 
 * Copyright (c) 2017 www.ofo.so, Inc. All Rights Reserved
 * 
 **************************************************************************/
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/vendor/aliyuncs/oss-sdk-php/samples/Common.php';

use OSS\OssClient;
use OSS\Core\OssException;

$bucket = Common::getBucketName();
$ossClient = Common::getOssClient();
if (is_null($ossClient)) exit(1);

function uploadFile(){
    global $ossClient;
    global $bucket;
    $result = $ossClient->uploadFile($bucket, "README.md", './README.md');
    Common::println($result['x-oss-request-id']);
    Common::println($result['etag']);
    Common::println($result['content-md5']);
    Common::println($result['body']);
}

function getObject(){
    global $ossClient;
    global $bucket;
    $content = $ossClient->getObject($bucket, "README.md");
    Common::println("README.md is fetched, the content is: " . $content);
}

function deleteObject(){
    global $bucket;
    global $ossClient;
    $result = $ossClient->deleteObject($bucket, "./README.md");
    Common::println("./README.md is deleted");
    Common::println($result['x-oss-request-id']);
}

getObject();



/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
?>
