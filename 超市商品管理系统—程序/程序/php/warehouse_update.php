<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Wid=$_POST['edit_Wid'];
    $edit_Waddress=$_POST['edit_Waddress'];
    $edit_WkeeperName=$_POST['edit_WkeeperName'];
    $edit_WkeeperPhone=$_POST['edit_WkeeperPhone'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码

    $query="select * from warehouse where Wid ='$edit_Wid'";
    $result=mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
      echo json_encode(array("feedback"=>"fail"));
    }
    else{
      if ($edit_Waddress!='') {
        $query="update warehouse set Waddress='$edit_Waddress' where Wid = '$edit_Wid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_WkeeperName!='') {
        $query="update warehouse set WkeeperName='$edit_WkeeperName' where Wid = '$edit_Wid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_WkeeperPhone!="") {
        $query="update warehouse set WkeeperPhone='$edit_WkeeperPhone' where Wid = '$edit_Wid'";
        mysqli_query($dbc,$query);
      }
      echo json_encode(array("feedback"=>"success"));
    }
    //关闭连接
    mysqli_close($dbc);
?>