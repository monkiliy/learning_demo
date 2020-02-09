<?php
$value = $_GET['value'];
$str = '';
if($value == 'news'){
    $str = "I am news";
}else if($value == 'about'){
    $str = "I am about";
}else if($value == 'contact'){
    $str = "I am contact";
}
echo $str;
?>