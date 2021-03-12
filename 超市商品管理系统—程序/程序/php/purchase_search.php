<?php 
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');

    $search_way = $_POST['search_way'];
    $search_text = $_POST['search_text'];
    $search_date = $_POST['search_date'];
    //创立连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    //mysql语句
    if ($search_date=='') {
        if ($search_way=="Pid") {
            $query="select * from customer_purchase_goods where Pid ='$search_text'";
        }
        else if($search_way=="Cid"){
            $query="select * from customer_purchase_goods where Customer_Cid ='$search_text'";
        }
        else if($search_way=="Gid"){
            $query="select * from customer_purchase_goods where Goods_Gid ='$search_text'";
        }
    }
    else{
        if ($search_way=="Pid") {
            $query="select * from customer_purchase_goods where Pid ='$search_text' and CTdate='$search_date'";
        }
        else if($search_way=="Cid"){
            $query="select * from customer_purchase_goods where Customer_Cid ='$search_text' and CTdate='$search_date'";
        }
        else if($search_way=="Gid"){
            $query="select * from customer_purchase_goods where Goods_Gid ='$search_text' and CTdate='$search_date'";
        }
        else{
            $query="select * from customer_purchase_goods where Pdate='$search_date'";
        }
    }
    //执行mysql语句
    $result = mysqli_query($dbc,$query);
    $put=array();
    while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
        $goods=$row["Goods_Gid"];

        $query="select * from goods where Gid='$goods'";
        $result1 = mysqli_query($dbc,$query);
        $row1=mysqli_fetch_array($result1,MYSQL_ASSOC);
        $goods_name=$row1["Gname"];

        if ($row["PpayMethod"]=="VIPcard") {
            $payway="会员卡";
        }
        else if ($row["PpayMethod"]=="cash") {
            $payway="现金";
        }
        else if ($row["PpayMethod"]=="online") {
            $payway="线上支付";
        }
        else if ($row["PpayMethod"]=="VIPpoints") {
            $payway="积分兑换";
        }
        else{
            $payway=$row["PpayMethod"];
        }
        array_push($put, array("Pid"=>$row["Pid"],"Customer_Cid"=>$row["Customer_Cid"],"Goods_Gid"=>$row["Goods_Gid"],"Gname"=>$goods_name,"Pquantity"=>$row["Pquantity"],"PtotalMoney"=>$row["PtotalMoney"],"PpayMethod"=>$payway,"PaddPoints"=>$row["PaddPoints"],"Pdate"=>$row["Pdate"]));
    }
    echo json_encode($put);
    //关闭连接
    mysqli_close($dbc);
?>