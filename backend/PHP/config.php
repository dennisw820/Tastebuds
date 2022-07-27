<?php
    $hostname = '192.168.1.125';
    $username = 'remote-user';
    $passwd = 'Fivecays123$';
    $db = 'Tastebuds';

    $conn = new mysqli($hostname, $username, $passwd, $db);

    if($conn->connect_errno) {
        die('There was an error connecting to the database.');
    }
?>