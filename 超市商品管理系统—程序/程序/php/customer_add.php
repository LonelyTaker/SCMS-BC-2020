<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Cname=$_POST['edit_Cname'];
    $edit_Cphone=$_POST['edit_Cphone'];
    $edit_Cadd=$_POST['edit_Cadd'];
    $edit_VIPbalance=$_POST['edit_VIPbalance'];
    if ($edit_VIPbalance=="") {
        $edit_VIPbalance=0;
    }
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    $query="INSERT INTO customer VALUES ('', '$edit_Cname','$edit_Cphone','$edit_Cadd','0','$edit_VIPbalance')";
    //执行mysql语句
    mysqli_query($dbc,"set names utf8");//防止乱码
    mysqli_query($dbc,$query);
    echo json_encode(array("feedback"=>"success"));

    //关闭连接
    mysqli_close($dbc);
?>