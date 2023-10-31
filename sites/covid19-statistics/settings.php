<?php

// phpcs:ignoreFile

// Override the default database.
$db_name = getenv('COVID19_STATISTICS_DATABASE_NAME');
$db_user = getenv('COVID19_STATISTICS_DATABASE_USERNAME');
$db_password = getenv('COVID19_STATISTICS_DATABASE_PASSWORD');

if ($db_name) {
  $databases['default']['default']['database'] = $db_name;
}
if ($db_password) {
  $databases['default']['default']['password'] = $db_password;
}
if ($db_user) {
  $databases['default']['default']['username'] = $db_user;
}

// Override the default settings.
$settings['hash_salt'] = getenv('COVID19_STATISTICS_SITE_HASH_SALT');
$settings['config_sync_directory'] = getenv('COVID19_STATISTICS_FILE_SYNC_PATH');
$settings['file_public_path'] = getenv('COVID19_STATISTICS_FILE_PUBLIC_PATH');
$settings['file_private_path'] = getenv('COVID19_STATISTICS_FILE_PRIVATE_PATH');
