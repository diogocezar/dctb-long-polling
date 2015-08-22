<?php
set_time_limit(0);
$dataFileName = 'data.txt'; 
while (true){
    $requestedTimestamp = isset($_POST['timestamp']) ? (int)$_POST['timestamp'] : null;       
    clearstatcache();  
    $modifiedAt = filemtime( $dataFileName );       
    if ($requestedTimestamp == null || $modifiedAt > $requestedTimestamp){
        $data = file_get_contents( $dataFileName );
        $arrData = array(
            'content' => $data,
            'timestamp' => $modifiedAt
        );
        $json = json_encode( $arrData );
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