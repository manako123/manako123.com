<?php

$uploadDir = "uploads/";
$jsonFile = "sounds.json";

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if (isset($_FILES["sound"])) {

    $fileName = time() . "_" . basename($_FILES["sound"]["name"]);
    $targetFile = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES["sound"]["tmp_name"], $targetFile)) {

        $sounds = json_decode(file_get_contents($jsonFile), true);
        if (!$sounds) $sounds = [];

        $sounds[] = [
            "name" => $_FILES["sound"]["name"],
            "file" => $targetFile
        ];

        file_put_contents($jsonFile, json_encode($sounds, JSON_PRETTY_PRINT));

        echo "success";
    } else {
        echo "error";
    }
}
?>