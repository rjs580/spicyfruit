<?php
  function logAccess($object = null) {
    ob_start();
    var_dump($object);
    $contents = ob_get_contents();
    ob_end_clean();

    $time = @date('[d/M/Y:H:i:s]');
    $log = $time . " [" . $_SERVER['REMOTE_ADDR'] . "] " . $contents;
    $accessFile = file_put_contents('../logs/access.log', $log, FILE_APPEND | LOCK_EX);
    unset($time, $contents, $log, $accessFile);
  }

  function logBadBehaviour($object = null) {
    ob_start();
    var_dump($object);
    $contents = ob_get_contents();
    ob_end_clean();

    $time = @date('[d/M/Y:H:i:s]');
    $log = $time . " [" . $_SERVER['REMOTE_ADDR'] . "] " . $contents;
    $accessFile = file_put_contents('../logs/badBehaviour.log', $log, FILE_APPEND | LOCK_EX);
    unset($time, $contents, $log, $accessFile);
  }