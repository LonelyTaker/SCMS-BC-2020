<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $username=$_COOKIE['username'];
    $password=$_POST['password'];
    $password_again=$_POST['password_again'];
    $Mphone=$_POST['Mphone'];
    $Memail=$_POST['Memail'];
    if ($password!='' && mb_strlen($password)<6 || mb_strlen($password)>18) {
      echo json_encode(array("feedback"=>"pw_wrong"));
    }
    else if($password!='' &&  $password!=$password_again){
      echo json_encode(array("feedback"=>"pwa_wrong"));
    }
    else if($Mphone!='' && mb_strlen($Mphone)!=11){
      echo json_encode(array("feedback"=>"phone_wrong"));
    }
    else{
      //创立连接
      $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
      mysqli_query($dbc,"set names utf8");//防止乱码
      if ($password!='') {
        $query="update manager set Mpassword='$password' where MuserName = '$username'";
        mysqli_query($dbc,$query);
      }
      if ($Mphone!='') {
        $query="update manager set Mphone='$Mphone' where MuserName = '$username'";
        mysqli_query($dbc,$query);
      }
      if ($Memail!='') {
        $query="update manager set Memail='$Memail' where MuserName = '$username'";
        mysqli_query($dbc,$query);
      }
      echo json_encode(array("feedback"=>"success"));
      //关闭连接
      mysqli_close($dbc);
    }
?>