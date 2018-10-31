<?php
class dbConnect{
    public $host = "localhost:3305";//定义默认连接方式
    public $zhang = "root";//定义默认用户名
    public $mi = "123456";//定义默认的密码
    public $dbname = "manager";//定义默认的数据库名

    public function Query($sql,$type=1){
        $db = new mysqli($this->host,$this->zhang,$this->mi,$this->dbname);
        $r = $db->query($sql);
        if($type == "1")
        {
            return $r->fetch_all();//查询语句，返回数组.执行sql的返回方式是all，也可以换成row
        }else{
            return $r;
        }
    }
}
?>