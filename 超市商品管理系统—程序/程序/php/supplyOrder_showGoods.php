<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');

    $show_data = $_POST['show_data'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    $query="select * from goods where Gid ='$show_data'";
    //执行mysql语句
    $result = mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
        echo json_encode(array("feedback"=>"fail"));
    }
    else{
        echo json_encode(array("feedback"=>$row["Gname"]));
    }
    //关闭连接
    mysqli_close($dbc);
?>