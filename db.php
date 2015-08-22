<?php
set_time_limit(0);
 
$PDO = new PDO( 'mysql:host=localhost;dbname=bancario', 'root', '****' );
 
while (true){
    $requestedTimestamp = isset( $_POST['timestamp'] ) ? $_POST['timestamp'] : "2015-01-01 00:00:00";
    $stmt = $PDO->prepare("SELECT id, name, date_update FROM user WHERE date_update > :requestedTimestamp ORDER BY date_update DESC");
    $stmt->bindParam( ':requestedTimestamp', $requestedTimestamp );
    $stmt->execute();
    $rows = $stmt->fetchAll( PDO::FETCH_ASSOC );
    if (count($rows) > 0){
        $json = json_encode($rows);
        echo $json;
        break;
    }
    else
    {
        sleep(5);
        continue;
    }
}
?>