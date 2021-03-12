<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query="select * from goods_contract_supplier";
    //执行sql语句并将结果存入结果集
    $result = mysqli_query($dbc,$query);
    $put=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
        $goods=$row["Goods_Gid"];
        $supplier=$row["Supplier_Sid"];

        $query="select * from goods where Gid='$goods'";
        $result1 = mysqli_query($dbc,$query);
        $row1=mysqli_fetch_array($result1,MYSQL_ASSOC);
        $goods_name=$row1["Gname"];

        $query="select * from supplier where Sid='$supplier'";
        $result1 = mysqli_query($dbc,$query);
        $row1=mysqli_fetch_array($result1,MYSQL_ASSOC);
        $supplier_name=$row1["Sname"];

    	array_push($put, array("CTid"=>$row["CTid"],"Goods_Gid"=>$row["Goods_Gid"],"Gname"=>$goods_name,"Supplier_Sid"=>$row["Supplier_Sid"],"Sname"=>$supplier_name,"CTunitPrice"=>$row["CTunitPrice"],"CTquantity"=>$row["CTquantity"],"CTtotalMoney"=>$row["CTtotalMoney"],"CTdate"=>$row["CTdate"],"CTnote"=>$row["CTnote"]));
    }
    echo json_encode($put);
    //关闭连接
    mysqli_close($dbc);
?>