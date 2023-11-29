# Drupal 10

### Requirements

- php 8.1.x
- composer 2.5.x

# Local Development

1) Run `composer install` command.
2) Create `.htaccess` file in **web** directory and copy the content in [Drupal source code](https://git.drupalcode.org/project/drupal/-/raw/9.5.x/.htaccess).
3) Create `.env` file in **root** directory, then enter your local dev details.

```ruby
# Localhost environment.
# Default variables.
DEFAULT_DEV_DEBUG=TRUE

# Database default variables.
DEFAULT_DATABASE_USERNAME=
DEFAULT_DATABASE_PASSWORD=
DEFAULT_DATABASE_HOSTNAME=127.0.0.1
DEFAULT_DATABASE_PORT=3306

# Default site variables.
DEFAULT_SITE_TMP_PATH=../tmp

# Pre-populate the below details for the drush command connection.
# This is only workaround while the drush aliases is being implemented.
DEFAULT_SITE_HASH_SALT=
DEFAULT_SITE_FILE_SYNC_PATH=../sites/covid19-statistics/files/sync
DEFAULT_DATABASE_NAME=dtc_covid19_statistics

# Covid19 Statistics environment.
COVID19_STATISTICS_SITE_URL=dtc-covid19-statistics.com.local
COVID19_STATISTICS_SITE_ID=covid19-statistics
COVID19_STATISTICS_SITE_HASH_SALT=
COVID19_STATISTICS_DATABASE_NAME=dtc_covid19_statistics
COVID19_STATISTICS_FILE_PUBLIC_PATH=sites/covid19-statistics/files
COVID19_STATISTICS_FILE_PRIVATE_PATH=../sites/covid19-statistics/files/private
COVID19_STATISTICS_FILE_SYNC_PATH=../sites/covid19-statistics/files/sync

# The below variables are utilized for production environment.
# Use the default database username and password variables for local development.
# COVID19_STATISTICS_DATABASE_PASSWORD=
# COVID19_STATISTICS_DATABASE_USERNAME=
```

4) Generate hash salt using the drush command below:

```bash
./vendor/bin/drush eval "var_dump(Drupal\Component\Utility\Crypt::randomBytesBase64(55))"

# sample output
# VvV3aqtiwjkcECOQnsO3eI-8nHwKS8qCpAESjLfPpAxZmQfTZVBmlpw_hK-SoHUg8TrLpFe4lA
```

5) Copy and paste the content in `COVID19_STATISTICS_SITE_HASH_SALT` environment key.
6) Create the following folder structure in **root** directory (if not exists).

```yaml
sites
  - covid19-statistics
    - files
      - private
      - sync
tmp
```

7) Create `.htaccess` in **root** directory, then copy and paste the content below:

```
<IfModule mod_rewrite.c>
  RewriteEngine on
  RewriteCond %{REQUEST_URI} !web/
  RewriteRule (.*) /web/$1 [L]
</IfModule>
```

8) Create a fresh database install.
9) Update the config uuid.

```bash
./vendor/bin/drush cset system.site uuid 93344094-6537-4246-8873-00ac9011ac7f -y
```

10) Import the configs.

```bash
./vendor/bin/drush cim
```

---

## Useful drush commands

```bash
# Generates one-time login for userone account.
./vendor/bin/drush uli
```

### To do

- Add drush aliases.
