<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 King Lee, Inc. All Rights Reserved
 * 
 **************************************************************************/

$ip = "106.2.223.26";
$file1 = fopen(__DIR__ . "/test.dat",'wb');
$ip2 = ip2long($ip);
fwrite($file1,pack('N',$ip2));
$filei2 = fopen(__DIR__ . "/test.dat",'rb');
print_r(unpack('Narray_key',fread($filei2,4)));









/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
?>
