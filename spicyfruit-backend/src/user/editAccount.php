<?php
  include("../commons/log.php");
  include("../commons/common.php");
  include("../commons/sessions.php");
  include("../commons/enumConstants.php");

  $postdata = json_decode($_POST["user"]);
  $profilePicData = $_FILES["profilePic"];

  if (json_last_error() === JSON_ERROR_NONE) {
    if (isset($postdata->userID) && isset($postdata->userEmail)) {
      $currUser = getUserFromSession();
      if (isset($currUser) && isset($currUser->userEmail) && isset($currUser->userID)) {
        if ($currUser->userEmail === $postdata->userEmail && $currUser->userID === $postdata->userID) {
          $profilePicFinalPath = null;
          if ($profilePicData !== null) {
            $imageType = exif_imagetype($profilePicData["tmp_name"]);
            if (!($imageType === IMAGETYPE_JPEG || $imageType === IMAGETYPE_PNG)) {
              sendErrorMSG("Profile picture is not a valid format, it needs to be JPG, or PNG");
            } else {
              if ($profilePicData["size"] > 1048576) { // greater than 1mb
                sendErrorMSG("File size is too big, it needs to be less than 1mb");
              } else {
                $userPersonalDirectory = "../userData/" . $currUser->userID . "/personal";
                if (!file_exists($userPersonalDirectory)) {
                  mkdir($userPersonalDirectory, 0777, true);
                } else {
                  $profilePicPath = $userPersonalDirectory . "/profilePic";
                  if (file_exists($profilePicPath . ".png")) {
                    unlink($profilePicPath . ".png");
                  }

                  if (file_exists($profilePicPath . ".jpg")) {
                    unlink($profilePicPath . ".jpg");
                  }

                  if (file_exists($profilePicPath . ".jpeg")) {
                    unlink($profilePicPath . ".jpeg");
                  }

                  if (file_exists($profilePicPath . ".pjpeg")) {
                    unlink($profilePicPath . ".pjpeg");
                  }

                  if (file_exists($profilePicPath . ".pjp")) {
                    unlink($profilePicPath . ".pjp");
                  }

                  if (file_exists($profilePicPath . ".jfif")) {
                    unlink($profilePicPath . ".jfif");
                  }

                  $profilePicFinalPath = $profilePicPath . "." . pathinfo($profilePicData["name"], PATHINFO_EXTENSION);
                  move_uploaded_file($profilePicData["tmp_name"], $profilePicFinalPath);
                }
              }
            }
          }

          $email = $currUser->userEmail;
          $id = $currUser->userID;
          $nickName = isset($postdata->nickName) ? $postdata->nickName : -1;
          $profilePic = isset($profilePicFinalPath) ? ($currUser->userID . "/personal/profilePic" . "." . pathinfo($profilePicData["name"], PATHINFO_EXTENSION)) : -1;

          $json = @file_get_contents(API_URL . "private/editProfile?email=" . $email .
            "&nickName=" . $nickName . "&id=" . $id . "&profilePic=" . $profilePic);

          if($json === false) {
            errorLog(error_get_last());
            sendErrorMSG("Error connecting with the API, please try again later");
          } else {
            $obj = json_decode($json);

            if (isset($obj) && isset($obj->code)) {
              if ($obj->code === ErrorCode) {
                sendErrorMSG($obj->message);
              } else if ($obj->code === SuccessCode) {
                saveUserToSession($obj->message);
                sendSuccessMSG("Success");
              } else {
                sendErrorMSG("Unrecognizable message was received from the API");
              }
            } else {
              sendErrorMSG("Error reaching API, please try again later");
            }
          }
        } else {
          $usr = 'User(' . $currUser->userID . ', ' . $currUser->userEmail . ', ' . $currUser->nickName . ')';
          $victim = 'Victim(' . $postdata->userID . ', ' . $postdata->userEmail . ')';
          logBadBehaviour($usr . ' attempted to change settings for ' . $victim);

          sendErrorMSG("User attempting to update another users profile (Recorded for further investigation)");
        }
      } else {
        sendErrorMSG("User not signed in to authorize changes");
      }
    } else {
      sendErrorMSG("Not enough data is provided");
    }
  } else {
    sendErrorMSG("Internal error");
  }