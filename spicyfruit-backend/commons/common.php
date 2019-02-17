<?php
  const API_URL = "http://spicyfruit_api:3000/";
  const ORIGIN = "http://spicyfruit.me";

  function errorLog($object = null) {
    ob_start();
    var_dump($object);
    $contents = ob_get_contents();
    ob_end_clean();
    error_log($contents);
  }

  function sendErrorMSG($message) {
    header("Access-Control-Allow-Origin: " . ORIGIN);
    header("Access-Control-Allow-Credentials: true");
    header("Content-type: application/json");
    $arr = array ("code" => -1, "message" => $message);
    echo json_encode($arr);
    exit;
  }

  function sendSuccessMSG($message) {
    header("Access-Control-Allow-Origin: " . ORIGIN);
    header("Access-Control-Allow-Credentials: true");
    header("Content-type: application/json");
    $arr = array ("code" => 0, "message" => $message);
    echo json_encode($arr);
    exit;
  }
