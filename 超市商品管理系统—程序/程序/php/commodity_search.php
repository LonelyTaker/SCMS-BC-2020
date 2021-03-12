<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');

    $search_way = $_POST['search_way'];
    $search_text = $_POST['search_text'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    if ($search_way=="Gname") {
    	$query="select * from goods where Gname like'%".$search_text."%'";
    }
    else{
    	$query="select * from goods where Gid ='$search_text'";
    }
    //执行mysql语句
    $result = mysqli_query($dbc,$query);
    $commoidty=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
    	array_push($commoidty, $row);
    }
    echo json_encode($commoidty);
    //关闭连接
    mysqli_close($dbc);
?>