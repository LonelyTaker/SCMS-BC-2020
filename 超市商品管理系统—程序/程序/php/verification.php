<?php
    require_once('connectvars.php');
    if (!isset($_COOKIE['username'])) {
    	echo json_encode(array("feedback"=>"fail"));
    }
    else{
    	echo json_encode(array("feedback"=>"success"));
    }
?>