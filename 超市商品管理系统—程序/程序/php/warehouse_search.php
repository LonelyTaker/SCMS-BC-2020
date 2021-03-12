<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $search_text = $_POST['search_text'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    $query="select * from warehouse where Wid='$search_text'";
    //执行mysql语句
    $result = mysqli_query($dbc,$query);
    $put=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
    	array_push($put, $row);
    }
    echo json_encode($put);
    //关闭连接
    mysqli_close($dbc);
?>