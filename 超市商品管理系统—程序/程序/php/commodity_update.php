<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Gid=$_POST['edit_Gid'];
    $edit_Gname=$_POST['edit_Gname'];
    $edit_Gtype=$_POST['edit_Gtype'];
    $edit_Gprice=$_POST['edit_Gprice'];
    $edit_GneedPoints=$_POST['edit_GneedPoints'];
    $edit_Warehouse_Wid=$_POST['edit_Warehouse_Wid'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码
    $feedback="";

    $query="select * from goods where Gid ='$edit_Gid'";
    $result=mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
      echo json_encode(array("feedback"=>"Goods_wrong"));
      exit;
    }
    else{
      if ($edit_Gname!='') {
        if ($row["Gquantity"]!=0) {
          echo json_encode(array("feedback"=>"exist_wrong"));
          exit;
        }
        else{
          $query="update goods set Gname='$edit_Gname' where Gid = '$edit_Gid'";
          mysqli_query($dbc,$query);
        }
      }
      if ($edit_Gtype!='') {
        $query="update goods set Gtype='$edit_Gtype' where Gid = '$edit_Gid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_Gprice!='') {
        $query="update goods set Gprice='$edit_Gprice' where Gid = '$edit_Gid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_GneedPoints!="") {
        $query="update goods set GneedPoints='$edit_GneedPoints' where Gid = '$edit_Gid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_Warehouse_Wid!="") {
        $query="update goods set Warehouse_Wid='$edit_Warehouse_Wid' where Gid = '$edit_Gid'";
        mysqli_query($dbc,$query);
      }
      echo json_encode(array("feedback"=>"success"));
    }
    //关闭连接
    mysqli_close($dbc);
?>