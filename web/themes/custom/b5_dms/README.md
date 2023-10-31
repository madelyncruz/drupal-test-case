# B5 DMS theme

[Bootstrap 5](https://www.drupal.org/project/bootstrap5) subtheme.

## Development.

### CSS compilation.

Prerequisites: install [sass](https://sass-lang.com/install).

1) Compile style.css:

```bash
sass scss/style.scss css/style.css
```

2) Compile style.css and ck5style.css:

```bash
sass scss/style.scss css/style.css && sass scss/ck5style.scss css/ck5style.css
```

3) Compile and watch style.css:

```bash
sass --watch scss/style.scss css/style.css
```

### Install Bootstrap Icons

1) Install `wikimedia/composer-merge-plugin` plugin.

```bash
composer require wikimedia/composer-merge-plugin
```

2) Create `composer.libraries.json` file, then paste the below JSON content.

```json
{
  "name": "b5-dms/b5-dms",
  "description": "Download B5 DMS libraries.",
  "type": "vcs",
  "license": "GPL-2.0+",
  "repositories": {
    "twbs-bootstrap-icons": {
      "type": "package",
      "package": {
        "name": "twbs/bootstrap-icons",
        "version": "1.10.5",
        "type": "drupal-library",
        "extra": {
          "installer-name": "twbs-bootstrap-icons"
        },
        "dist": {
          "url": "https://github.com/twbs/icons/archive/refs/tags/v1.10.5.zip",
          "type": "zip"
        },
        "require": {
          "composer/installers": "~1.0"
        }
      }
    }
  },
  "require": {
    "twbs/bootstrap-icons": "1.10.5"
  }
}
```

3) Edit the `composer.json`, paste the below JSON content under the extra key.

```json
"merge-plugin": {
    "include": [
        "composer.libraries.json"
    ]
}
```

4) Run `composer update --lock` to download the libraries.

### Install "my account" block

1) Install `drupal/avatar_field_formatter` module.
2) Apply patches.

```json
"drupal/avatar_field_formatter": {
  "3346646: Missing file_url_generator dependency": "https://www.drupal.org/files/issues/2023-10-14/avatar_field_formatter-d10-3346646.patch",
  "3316438: Add option to configure the foreground and border size": "https://www.drupal.org/files/issues/2022-10-20/add-configure-option-foreground-and-border-size-3316438.patch",
  "3169434: SVG option does not use the defined Font-Familly": "https://www.drupal.org/files/issues/2022-01-16/3169434-2.patch"
},
```

3) Import `config/sync/views.view.b5_dms_user.yml` config.
4) Import `config/sync/block.block.b5_dms_user_block_avatar.yml` config.
5) Assign `B5: User: Avatar` block to sidebar nav region.
