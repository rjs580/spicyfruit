<?php
//  $url = 'http://spicyfruit_api:3000/';
//  print_r(get_headers($url, 1));

//  include("./commons/common.php");
  $json = file_get_contents("http://spicyfruit_api:3000/private");
  echo($json);

//  if($json === false) {
//    errorLog(error_get_last());
//    sendErrorMSG("Error connecting with the API, please try again later");
//  } else {
//    $obj = json_decode($json);
//
//    if (isset($obj) && isset($obj->code)) {
//      if ($obj->code === ErrorCode) {
//        sendErrorMSG($obj->message);
//      } else if ($obj->code === SuccessCode) {
//        saveUserToSession($obj->message);
//        sendSuccessMSG("Success");
//      } else {
//        sendErrorMSG("Unrecognizable message was received from the API");
//      }
//    } else {
//      sendErrorMSG("Error reaching API, please try again later");
//    }
//  }