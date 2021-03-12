<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query="select * from goods";
    //执行sql语句并将结果存入结果集
    $result = mysqli_query($dbc,$query);
    $commoidty=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
    	array_push($commoidty, $row);
    }
    echo json_encode($commoidty);
    //关闭连接
    mysqli_close($dbc);
?>