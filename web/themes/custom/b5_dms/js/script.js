
(function ($, Drupal, drupalSettings, once) {
  'use strict';

  Drupal.behaviors.b5_dms = {
    attach: function (context) {
      // Disable the automatic dismissal of a Bootstrap Modal
      // when clicking outside of it or pressing the 'Escape' key.
      if (drupalSettings.bs4_modal_dialog) {
        drupalSettings.bs4_modal_dialog.backdrop = 'static';
        drupalSettings.bs4_modal_dialog.keyboard = false;
      }

      var sidebarNav = once('b5-dms-sidebar-nav', '.sidebar-nav', context);
      if (sidebarNav.length) {
        sidebarNav.forEach(processSidebarNav);
      }

      var assignToMe = once('b5-dms-assignee', '.js-assignee', context);
      if (assignToMe.length) {
        assignToMe.forEach(processAssignToMe);
      }
    }
  }

  /**
   * Process the "Assign to Me" functionality for a given element.
   *
   * This function selects the current user as the assignee when a related
   * element with the class 'assignee' is clicked.
   *
   * @param {jQuery|HTMLElement} element - The element to process.
   */
  function processAssignToMe(element) {
    element = $(element);
    var assignee = element.find('.assignee');
    var select = element.find('select');


    assignee.on('click', function() {
      select.val(drupalSettings.user.uid).trigger('chosen:updated');
    });

    // Pre-populate the assignee on node add.
    if (drupalSettings.path.currentPath.includes('node/add') && select.val() == SELECT_NONE) {
      assignee.trigger('click');
    }
  }

  /**
   * Process a sidebar navigation element and enable slide toggle if applicable.
   *
   * @param {Object} element - The sidebar navigation context.
   */
  function processSidebarNav(element) {
    var sidebar = $(element);
    var slideToggle = sidebar.find('.js-slide-toggle');

    if (slideToggle.length) {
      sidebarNavSlideToggle(slideToggle);
    }
  }

  /**
   * Toggle the state of the sidebar navigation region.
   *
   * @param {Object} button - The JavaScript toggle button.
   */
  function sidebarNavSlideToggle(button) {
    var sidebar = button.closest('.sidebar-nav');
    var slideToggleStorageKey = 'sidebar-nav-slide-toggle';
    var currSlideToggle = window.localStorage.getItem(slideToggleStorageKey) || SIDEBAR_NAV_SLIDE_TOGGLE_IN;

    button.addClass(currSlideToggle === SIDEBAR_NAV_SLIDE_TOGGLE_IN ? 'active' : '');
    sidebar.addClass(currSlideToggle);

    button.on('click', function() {
      const $button = $(this);
      const toggleTo = currSlideToggle === SIDEBAR_NAV_SLIDE_TOGGLE_IN ? SIDEBAR_NAV_SLIDE_TOGGLE_OUT : SIDEBAR_NAV_SLIDE_TOGGLE_IN;
      currSlideToggle = toggleTo;

      $button.toggleClass('active');
      sidebar
        .toggleClass(`${SIDEBAR_NAV_SLIDE_TOGGLE_IN} ${SIDEBAR_NAV_SLIDE_TOGGLE_OUT}`, false)
        .toggleClass(toggleTo, true);
      window.localStorage.setItem(slideToggleStorageKey, toggleTo);
    });
  }

  // Define constants.
  const SIDEBAR_NAV_SLIDE_TOGGLE_IN = 'expanded';
  const SIDEBAR_NAV_SLIDE_TOGGLE_OUT = 'collapsed';
  const SELECT_NONE = '_none';

})(jQuery, Drupal, drupalSettings, once);

