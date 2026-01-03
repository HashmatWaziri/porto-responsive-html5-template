/* 
 * Fanavar Steel - Custom JavaScript
 * Language Switcher and UI Interactions
 */

// Language Switcher Functionality
(function($) {
    'use strict';

    // Initialize language switcher
    function initLanguageSwitcher() {
        const $languageItems = $('.language-dropdown .dropdown-item');
        const $currentLang = $('.language-toggle .current-lang');
        const $dropdown = $('.language-switcher-nav .nav-item.dropdown');
        const $toggle = $('.language-switcher-nav .language-toggle');

        // Handle language selection
        $languageItems.on('click', function(e) {
            e.preventDefault();
            const $this = $(this);
            const lang = $this.data('lang');
            const langName = $this.text();

            // Update current language display
            $currentLang.text(langName);

            // Update active state
            $languageItems.removeClass('active');
            $this.addClass('active');

            // Store preference
            localStorage.setItem('preferredLanguage', lang);

            // Here you would typically trigger a language change
            // For now, we'll just log it
            console.log('Language switched to:', lang);
        });

        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            const $langItem = $(`.language-dropdown .dropdown-item[data-lang="${savedLang}"]`);
            if ($langItem.length) {
                $currentLang.text($langItem.text());
                $languageItems.removeClass('active');
                $langItem.addClass('active');
            }
        }

        // Hover functionality for language dropdown
        // Show dropdown on hover
        $toggle.on('mouseenter', function() {
            $dropdown.addClass('show');
            $dropdown.find('.dropdown-menu').addClass('show');
            $toggle.attr('aria-expanded', 'true');
        });

        // Hide dropdown when mouse leaves
        $dropdown.on('mouseleave', function() {
            $dropdown.removeClass('show');
            $dropdown.find('.dropdown-menu').removeClass('show');
            $toggle.attr('aria-expanded', 'false');
        });

        // Handle click fallback (for touch devices and accessibility)
        $toggle.on('click', function(e) {
            e.preventDefault();
            const isShown = $dropdown.hasClass('show');

            // Close all dropdowns first
            $('.language-switcher-nav .nav-item.dropdown').removeClass('show');
            $('.language-switcher-nav .dropdown-menu').removeClass('show');
            $('.language-switcher-nav .language-toggle').attr('aria-expanded', 'false');

            // Toggle this dropdown
            if (!isShown) {
                $dropdown.addClass('show');
                $dropdown.find('.dropdown-menu').addClass('show');
                $toggle.attr('aria-expanded', 'true');
            }
        });

        // Close dropdown when clicking outside
        $(document).on('click', function(e) {
            if (!$toggle.closest('.language-switcher-nav').length) {
                $dropdown.removeClass('show');
                $dropdown.find('.dropdown-menu').removeClass('show');
                $toggle.attr('aria-expanded', 'false');
            }
        });

        // Keyboard accessibility
        $toggle.on('keydown', function(e) {
            if (e.key === 'Escape') {
                $dropdown.removeClass('show');
                $dropdown.find('.dropdown-menu').removeClass('show');
                $toggle.attr('aria-expanded', 'false');
                $toggle.focus();
            }
        });

        // Handle keyboard navigation in dropdown
        $languageItems.on('keydown', function(e) {
            if (e.key === 'Escape') {
                $dropdown.removeClass('show');
                $dropdown.find('.dropdown-menu').removeClass('show');
                $toggle.attr('aria-expanded', 'false');
                $toggle.focus();
            }
        });
    }

    // Initialize on document ready
    $(document).ready(function() {
        initLanguageSwitcher();
    });

})(jQuery);