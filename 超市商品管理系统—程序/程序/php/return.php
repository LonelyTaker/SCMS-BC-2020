<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    $modular=$_POST['modular'];
    if ($modular=="nproccess") {
        $j=0;
    }
    else{
        $j=1;
    }
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query="select * from customer_return_goods";
    //执行sql语句并将结果存入结果集
    $result = mysqli_query($dbc,$query);
    $put=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
        if (($row["Rstate"]==1 || $row["Rstate"]==-1) && $j==0) {
            continue;
        }
        if ($row["Rstate"]==0 && $j==1) {
            continue;
        }
        $query="select Gprice from goods where Gname='".$row["Goods_Gname"]."'";
        $result1 = mysqli_query($dbc,$query);
        $row1=mysqli_fetch_array($result1,MYSQL_ASSOC);
        $return_price=$row1["Gprice"]*$row["Rquantity"];
        if ($row["Rstate"]==1) {
            $Rstate="通过";
        }
        else if ($row["Rstate"]==-1) {
            $Rstate="不通过";
        }
        else {
            $Rstate="待处理";
        }
        array_push($put, array("Rid"=>$row["Rid"],"Cid"=>$row["Customer_Cid"],"Pid"=>$row["Purchase_Pid"],"Gname"=>$row["Goods_Gname"],"Rquantity"=>$row["Rquantity"],"Rprice"=>$return_price,"Rreason"=>$row["Rreason"],"Rdate"=>$row["Rdate"],"Rstate"=>$Rstate));
    }
    echo json_encode($put);
    //关闭连接
    mysqli_close($dbc);
?>