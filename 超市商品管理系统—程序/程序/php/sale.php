<?php 
    header("Content-type:text/html;charset=utf-8");
    header("Content-type:text/html;charset=utf-8");
    require_once('connectvars.php');
    //创建连接
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    $search_way = $_POST['search_way'];
    $search_date = $_POST['search_date'];
    $put=array();
    if ($search_way=="date") {
        $income=0;
        $pay=0;
        $query="select PtotalMoney from customer_purchase_goods where Pdate='$search_date'";
        $result = mysqli_query($dbc,$query);
        while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
            $income=$income+$row["PtotalMoney"];
        }
        $query="select CTtotalMoney from goods_contract_supplier where CTdate='$search_date'";
        $result = mysqli_query($dbc,$query);
        while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
            $pay=$pay+$row["CTtotalMoney"];
        }
        $profit=$income-$pay;
        array_push($put, array("date"=>$search_date,"income"=>$income,"pay"=>$pay,"profit"=>$profit));
    }
    else{
        if ($search_way=="Month") {
            $start=date("Y-m-d",strtotime("-1 month"));
        }
        else if ($search_way=="Week") {
            $start=date("Y-m-d",strtotime("-1 week"));
        }
        else{
            $start=date("Y-m-d",strtotime("-3 day"));
        }
        $end=date("Y-m-d");
        $days=abs((strtotime($end)-strtotime($start))/86400);

        for ($i=$days; $i >0; $i--) {
            $day=date("Y-m-d",strtotime("-$i day"));
            $income=0;
            $pay=0;

            $query="select PtotalMoney from customer_purchase_goods where Pdate='$day'";
            $result = mysqli_query($dbc,$query);
            while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
                $income=$income+$row["PtotalMoney"];
            }
            $query="select CTtotalMoney from goods_contract_supplier where CTdate='$day'";
            $result = mysqli_query($dbc,$query);
            while ($row=mysqli_fetch_array($result,MYSQL_ASSOC)) {
                $pay=$pay+$row["CTtotalMoney"];
            }
            $profit=$income-$pay;
            array_push($put, array("date"=>$day,"income"=>$income,"pay"=>$pay,"profit"=>$profit));
        }
    }
    
    echo json_encode($put);
    //关闭连接
    mysqli_close($dbc);
?>