<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $edit_Sid=$_POST['edit_Sid'];
    $edit_Sname=$_POST['edit_Sname'];
    $edit_SconName=$_POST['edit_SconName'];
    $edit_SconPhone=$_POST['edit_SconPhone'];
    $edit_Sadd=$_POST['edit_Sadd'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    mysqli_query($dbc,"set names utf8");//防止乱码
    
    $query="select * from supplier where Sid ='$edit_Sid'";
    $result=mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    if ($row==null) {
      echo json_encode(array("feedback"=>"fail"));
    }
    else{
      if ($edit_Sname!='') {
        $query="update supplier set Sname='$edit_Sname' where Sid = '$edit_Sid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_SconName!='') {
        $query="update supplier set ScontactName='$edit_SconName' where Sid = '$edit_Sid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_SconPhone!='') {
        $query="update supplier set ScontactPhone='$edit_SconPhone' where Sid = '$edit_Sid'";
        mysqli_query($dbc,$query);
      }
      if ($edit_Sadd!="") {
        $query="update supplier set Saddress='$edit_Sadd' where Sid = '$edit_Sid'";
        mysqli_query($dbc,$query);
      }
      echo json_encode(array("feedback"=>"success"));
    }
    //关闭连接
    mysqli_close($dbc);
?>