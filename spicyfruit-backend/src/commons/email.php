<?php
  include("../commons/sessions.php");

  function emailUserAsNoReply($subject, $body): bool {
    $user = getUserFromSession();
    if (isSessionExpired() === false && isset($user) && isset($user->userID) && isset($user->userEmail) && isset($user->nickName)) {
      $to = $user->userEmail;

      $newLine = "\r\n";
      $headers = "From: SpicyFruit Team <spicyfruit-noreply@spicyfruit.me>" . $newLine;
      $headers .= "MIME-Version: 1.0" . $newLine;
      $headers .= "Content-Type: text/html; charset=UTF-8" . $newLine;

      return mail($to, $subject, $body, $headers);
    }

    return false;
  }

  function emailUserAsAdmin($subject, $body): bool {
    $user = getUserFromSession();
    if (isSessionExpired() === false && isset($user) && isset($user->userID) && isset($user->userEmail) && isset($user->nickName)) {
      $to = $user->userEmail;

      $newLine = "\r\n";
      $headers = "From: SpicyFruit Admin <admin@spicyfruit.me>" . $newLine;
      $headers .= "MIME-Version: 1.0" . $newLine;
      $headers .= "Content-Type: text/html; charset=UTF-8" . $newLine;

      return mail($to, $subject, $body, $headers);
    }

    return false;
  }