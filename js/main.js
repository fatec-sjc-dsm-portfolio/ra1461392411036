(function ($) {
    "use strict";

    // Theme Toggle (Dark / Light)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        });
    }

    // Typed Initiate
    if ($('.typed-text-output').length === 1 && typeof Typed !== 'undefined') {
        var typed_strings = $('.typed-text').text();
        new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 80,
            backSpeed: 30,
            smartBackspace: false,
            loop: true
        });
    }

    // Project Category Filter
    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        var filterValue = $(this).attr('data-filter');
        if (filterValue === 'all') {
            $('.project-item-card').fadeIn(250);
        } else {
            $('.project-item-card').hide();
            $('.project-item-card[data-category="' + filterValue + '"]').fadeIn(250);
        }
    });

    // Active Navigation Link on Scroll & Back to top button
    $(window).scroll(function () {
        var scrollPos = $(document).scrollTop() + 120;

        $('section[id]').each(function () {
            var currSection = $(this);
            var sectionTop = currSection.offset().top;
            var sectionHeight = currSection.outerHeight();
            var sectionId = currSection.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $('.nav-links a').removeClass('active');
                $('.nav-links a[href="#' + sectionId + '"]').addClass('active');
            }
        });

        if ($(this).scrollTop() > 250) {
            $('.back-to-top').css('display', 'inline-flex').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
})(jQuery);
