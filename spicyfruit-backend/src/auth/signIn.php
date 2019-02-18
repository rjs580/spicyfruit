<?php
  include("../commons/log.php");
  include("../commons/common.php");
  include("../commons/sessions.php");
  include("../commons/enumConstants.php");

  $postdata = file_get_contents("php://input");
  $postdata = json_decode($postdata);

  if(json_last_error() === JSON_ERROR_NONE && isset($postdata->userType)) {
    if(($postdata->userType === SocialUser || $postdata->userType === Regular) && isset($postdata->userEmail)) {
      $userType = $postdata->userType;
      $email = $postdata->userEmail;
      $nickName = '';
      $password = isset($postdata->userPassword) ? $postdata->userPassword : -1;
      $tokenId = isset($postdata->idToken) ? $postdata->idToken : -1;
      $id = isset($postdata->id) ? $postdata->id : -1;

      if($userType === Regular && verifyPassword($password) === false) {
        sendErrorMSG("Password must be 8 characters or longer containing at least one number and one letter");
      } else {
        $json = @file_get_contents(API_URL . "private/signIn?type=" . $userType . "&email=" . $email .
          "&name=" . $nickName . "&password=" . $password . "&tokenId=" . $tokenId . "&id=" . $id);

        if($json === false) {
          errorLog(error_get_last());
          sendErrorMSG("Error connecting with the API, please try again later");
        } else {
          $obj = json_decode($json);

          if (isset($obj) && isset($obj->code)) {
            if ($obj->code === ErrorCode) {
              sendErrorMSG($obj->message);
            } else if ($obj->code === SuccessCode) {
              logAccess('User(' . $obj->message->userID . ', ' . $obj->message->userEmail . ', ' . $obj->message->nickName . ') signed in');

              saveUserToSession($obj->message);
              sendSuccessMSG("Success");
            } else {
              sendErrorMSG("Unrecognizable message was received from the API");
            }
          } else {
            sendErrorMSG("Error reaching API, please try again later");
          }
        }
      }
    } else {
      sendErrorMSG("Wrong user type or not enough data is provided");
    }
  } else {
    sendErrorMSG("Internal error");
  }