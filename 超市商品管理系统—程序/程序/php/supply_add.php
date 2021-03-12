<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Sname=$_POST['edit_Sname'];
    $edit_SconName=$_POST['edit_SconName'];
    $edit_SconPhone=$_POST['edit_SconPhone'];
    $edit_Sadd=$_POST['edit_Sadd'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码
    //mysql语句
    $query="INSERT INTO supplier VALUES ('', '$edit_Sname','$edit_SconName','$edit_SconPhone','$edit_Sadd')";
    //执行mysql语句
    mysqli_query($dbc,$query);
    echo json_encode(array("feedback"=>"success"));
    //关闭连接
    mysqli_close($dbc);
?>