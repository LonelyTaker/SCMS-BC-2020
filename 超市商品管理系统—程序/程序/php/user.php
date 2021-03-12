<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query="select * from manager";
    //执行sql语句并将结果存入结果集
    $result = mysqli_query($dbc,$query);
    $row=mysqli_fetch_array($result,MYSQL_ASSOC);
    $birthday=$row["MidCard"][6].$row["MidCard"][7].$row["MidCard"][8].$row["MidCard"][9]."-".$row["MidCard"][10].$row["MidCard"][11]."-".$row["MidCard"][12].$row["MidCard"][13];
    $MidCard=substr_replace($row["MidCard"],"************",2,12);
    echo json_encode(array('MuserName'=>$row["MuserName"],'Mname'=>$row["Mname"],'Msex'=>$row["Msex"],'Mbirthday'=>$birthday,'MidCard'=>$MidCard,'Mphone'=>$row["Mphone"],'Memail'=>$row["Memail"]));
    //关闭连接
    mysqli_close($dbc);
?>