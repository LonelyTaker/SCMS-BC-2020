<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Gname=$_POST['edit_Gname'];
    $edit_Gtype=$_POST['edit_Gtype'];
    $edit_Gprice=$_POST['edit_Gprice'];
    $edit_GneedPoints=$_POST['edit_GneedPoints'];
    $edit_Warehouse_Wid=$_POST['edit_Warehouse_Wid'];
    if ($edit_GneedPoints=='') {
        $edit_GneedPoints=0;
    }
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码
    //mysql语句
    $query="INSERT INTO goods VALUES ('', '$edit_Gname','$edit_Gtype','$edit_Gprice','0','$edit_GneedPoints','$edit_Warehouse_Wid')";
            //执行mysql语句
        mysqli_query($dbc,$query);
        echo json_encode(array("feedback"=>"success"));
    //关闭连接
    mysqli_close($dbc);
?>