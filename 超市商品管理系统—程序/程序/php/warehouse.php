<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query="select * from warehouse";
    //执行sql语句并将结果存入结果集
    $result = mysqli_query($dbc,$query);
    $put=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
    	array_push($put, $row);
    }
    echo json_encode($put);
    //关闭连接
    mysqli_close($dbc);
?>