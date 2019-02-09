<?php
  session_start();

  const expireTime = 30; // 30 min

  function updateLastActivityTime() {
    $_SESSION["lastActivityTime"] = time();
  }

  function isSessionExpired() {
    if(isset($_SESSION["lastActivityTime"])) {
      $secondsInactive = time() - $_SESSION["lastActivityTime"];
      $expireAfterSeconds = expireTime * 60;

      return ($secondsInactive >= $expireAfterSeconds);
    }

    return true;
  }

  function saveUserToSession($user) {
    updateLastActivityTime();
    $_SESSION["user"] = $user;
  }

  function getUserFromSession() {
    return isset($_SESSION["user"]) === true ? $_SESSION["user"] : null;
  }

  function destroySession() {
    session_unset();
    session_destroy();
  }