<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');

    $edit_Gid=$_POST['edit_Gid'];
    $edit_Sid=$_POST['edit_Sid'];
    $edit_Sprice=$_POST['edit_Sprice'];
    $edit_Gnumber=$_POST['edit_Gnumber'];
    $totalMoney=$edit_Sprice*$edit_Gnumber;
    $edit_date=$_POST['edit_date'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码
    //mysql语句
    //新增订单
    $query="INSERT INTO goods_contract_supplier VALUES ('', '$edit_Gid','$edit_Sid','$edit_Sprice','$edit_Gnumber','$totalMoney','$edit_date','')";
    //执行Mysql语句
    mysqli_query($dbc,$query);
    //更新商品表中的库存
    $query="update goods set Gquantity=Gquantity+'$edit_Gnumber' where Gid = '$edit_Gid'";
    //执行Mysql语句
    mysqli_query($dbc,$query);
    echo json_encode(array("feedback"=>"success"));
    //关闭连接
    mysqli_close($dbc);
?>