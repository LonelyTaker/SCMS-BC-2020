<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Waddress=$_POST['edit_Waddress'];
    $edit_WkeeperName=$_POST['edit_WkeeperName'];
    $edit_WkeeperPhone=$_POST['edit_WkeeperPhone'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码
    //mysql语句
    $query="INSERT INTO warehouse VALUES ('', '$edit_Waddress','$edit_WkeeperName','$edit_WkeeperPhone')";
    //执行mysql语句
    mysqli_query($dbc,$query);
    echo json_encode(array("feedback"=>"success"));
    //关闭连接
    mysqli_close($dbc);
?>