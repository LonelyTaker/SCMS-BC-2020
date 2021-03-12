<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');

    $search_way = $_POST['search_way'];
    $search_text = $_POST['search_text'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    if ($search_way=="Sname") {
    	$query="select * from supplier where Sname like'%".$search_text."%'";
    }
    else{
    	$query="select * from supplier where Sid ='$search_text'";
    }
    //执行mysql语句
    $result = mysqli_query($dbc,$query);
    $supply=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
    	array_push($supply, $row);
    }
    echo json_encode($supply);
    //关闭连接
    mysqli_close($dbc);
?>