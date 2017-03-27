<?php
/***************************************************************************
 * 
 * Copyright (c) 2015 koudai.com, Inc. All Rights Reserved
 * 

 **************************************************************************/

//  reference from : https://segmentfault.com/a/1190000003509917
xhprof_enable(
    XHPROF_FLAGS_MEMORY|XHPROF_FLAGS_CPU,
    [
        'ignored_functions'    => [
            'call_user_func',
            'call_user_func_array'
        ]
    ]
);

$src = '重庆西南医院展开床位2600余张，设备总值6.5亿元，年门急诊量261万人次，收治量11万人次，手术5.8万台次。凭借着精湛的技术、雄厚的资金、先进的设备和优秀的人才。共设43个临床、医技科室，其中国家级重点学科10个(烧伤科、肝胆科、感染病、泌尿外科、神经外科、骨科、胸心外科、整形外科、心血管内科、呼吸内科)，国家重点培育学科 2 个 ( 消化科、眼科 ) ，国家中医药管理局重点学科 1 个 ( 中西医结合风湿病 ) ，全军医学研究所 7 个 ( 烧伤科、肝胆科、感染科、泌尿科、消化科、神经外科、病理科 ) ，全军专科专病中心 7 个 ( 骨科、眼科、普外科、检验科、妇产科、心内科、康复科 ) ，临床医学一级学科均为博士学位授权学科及重庆市重点学科。学科综合实力和临床治疗水平居全国前列。

　　重庆西南医院优势领域明显：烧（伤）创伤、肝病、肿瘤是医院传统的优势领域。其中，烧伤研究所为烧伤医学“国家队”，被誉为世界烧伤“四大家族”之一，在大面积严重烧伤的基础研究和临床救治方面均处于世界领先水平。此外，胆道外科、重症肝炎救治、尿道外科、肢体延长等技术均在国内外享有盛誉。三大特色技术突出：医院近年来形成了“一大”、“一小”、“一新”的技术特色。“一大”即器官移植，医院先后开展了以同种异体急诊肝脏移植、成人间活体部分肝移植、心脏移植、心肾联合移植、胰肾联合移植、骨髓移植等为代表的系列大器官移植技术，其中肝移植已完成超过400例；“一小”即系列微创手术技术，包括以肝胆、普外和妇科腹腔镜为代表的系列腔镜治疗，以心血管、脑血管介入治疗为代表的系列介入治疗和以消化内镜、纤支镜治疗为代表的系列内镜治疗，为患者解决了巨大的痛苦；“一新”即以基因芯片、转基因猪皮为代表的医学前沿研究，均已取得一系列的成果，正在逐步转化为现实的诊断治疗优势。

　　重庆西南医院患友讨论热门疾病：乙肝，眼外伤，皮肤整形，泌尿系疾病，头痛，鼻炎，关节损伤，多囊卵巢综合征，胃炎，胰腺炎，不孕不育，类风湿性关节炎，肝病，先天性心脏病，风湿病。

　　重庆西南医院患友讨论热门大夫：
　　1，王宇明 感染科，主任医师。擅长治疗乙肝等肝病。<a href="http://www.haodf.com/doctor/DE4r08xQdKSLufRPi8upZO0ZUs6x.htm" target="_blank">点击查看王宇明大夫相关点评</a>

　　2，王一 眼科，主任医师。擅长治疗眼科疾病。<a href="http://www.haodf.com/doctor/DE4r08xQdKSLufMPiBFq-tVG1BZ1.htm" target="_blank">点击查看王一大夫相关点评</a>

　　3，常青 妇产科，主任医师。擅长治疗妇科内分泌疾病（月经紊乱、异常子宫出血、闭经等）及中老年妇女激素替代治疗。<a href="http://www.haodf.com/doctor/DE4r08xQdKSLufLDLGNoD0ioO33P.htm" target="_blank">点击查看常青大夫相关点评</a>

　　4，别平 肝胆外科，主任医师。擅长治疗胰腺炎及其并发症。<a href="http://www.haodf.com/doctor/DE4r08xQdKSLPhY-b66N34PvWMSU.htm" target="_blank">点击查看别平大夫相关点评</a>

　　更多大夫点评请查看好大夫在线 [www.haodf.com]';
    echo $src.PHP_EOL;
    $pattern = '/\w[www.haodf.com]/';
    $pattern = '/\w[a-z,A-Z]*/i';
    $pattern = '/<a[^>]*href=[^>]*>|<\/[^a]*a[^>]*>/i';
    $des = preg_replace($pattern,'',$src);
    $pattern = '/\[www.haodf.com]/';
    $des = preg_replace($pattern,'',$des);
    $pattern = '/更多大夫点评请查看好大夫在线/';
    $des = preg_replace($pattern,'',$des);
    $pattern = '/好大夫在线/';
    $des = preg_replace($pattern,'',$des);
    echo $des.PHP_EOL;


    $xhprofData = xhprof_disable();// $xhprofData是数组形式的分析结果
    print_r($xhprofData);


require '/var/www/html/xhprof_lib/utils/xhprof_lib.php';
require '/var/www/html/xhprof_lib/utils/xhprof_runs.php';
$xhprofRuns = new XHProfRuns_Default();
$runId = $xhprofRuns->save_run($xhprofData, 'xhprof_test');
echo 'http://localhost/xhprof_html/index.php?run=' . $runId . '&source=xhprof_test'.PHP_EOL;


/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
?>
