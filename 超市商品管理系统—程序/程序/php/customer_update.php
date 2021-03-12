<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Cid=$_POST['edit_Cid'];
    //$edit_Cname=$_POST['edit_Cname'];
    $edit_Cphone=$_POST['edit_Cphone'];
    $edit_Cadd=$_POST['edit_Cadd'];
    $edit_VIPbalance=$_POST['edit_VIPbalance'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query="select * from customer where Cid ='$edit_Cid'";
    $result=mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
      echo json_encode(array("feedback"=>"fail"));
    }
    else{
      if ($edit_Cphone!='') {
        $query="update customer set Cphone='$edit_Cphone' where Cid = '$edit_Cid'";
        mysqli_query($dbc,"set names utf8");//防止乱码
        mysqli_query($dbc,$query);
      }
      if ($edit_Cadd!='') {
        $query="update customer set Caddress='$edit_Cadd' where Cid = '$edit_Cid'";
        mysqli_query($dbc,"set names utf8");//防止乱码
        mysqli_query($dbc,$query);
      }
      if ($edit_VIPbalance!="") {
        $query="update customer set VIPbalance=VIPbalance+'$edit_VIPbalance' where Cid = '$edit_Cid'";
        mysqli_query($dbc,"set names utf8");//防止乱码
        mysqli_query($dbc,$query);
      }
      echo json_encode(array("feedback"=>"success"));
    }
    //关闭连接
    mysqli_close($dbc);
?>