<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Gid=$_POST['edit_Gid'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    $query="select * from goods where Gid = '$edit_Gid'";
    $result = mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
        echo json_encode(array("feedback"=>"fail"));
    }
    else{
        $query="delete from goods where Gid = '$edit_Gid'";
        //执行mysql语句
        mysqli_query($dbc,$query);
        echo json_encode(array("feedback"=>"success"));
    }
    //关闭连接
    mysqli_close($dbc);
?>