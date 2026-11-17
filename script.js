(function () {
  'use strict';

  // No jQuery: leave all content visible in its original HTML/CSS state.
  if (!window.jQuery) {
    return;
  }

  const $ = window.jQuery;
  const $document = $(document);

  // A second execution of this file must not create another observer or
  // register the same interaction twice.
  if ($document.data('landingPageInitialized')) {
    return;
  }
  $document.data('landingPageInitialized', true);

  // Preserve the existing preview message; no signup endpoint was supplied.
  $('#newsletter-form').on('submit.landingNewsletter', function handleNewsletterSubmit(event) {
    event.preventDefault();
    $('#newsletter-status')
      .text('Newsletter signup is not available yet.')
      .prop('hidden', false);
  });

  // Only elements below Home have data-reveal. Cards animate as a whole so
  // their images/text do not receive nested transforms or duplicate delays.
  const $elements = $('[data-reveal]');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (motionPreference.matches || typeof window.IntersectionObserver !== 'function') {
    $elements.addClass('is-visible');
    return;
  }

  let observer;

  function revealAll() {
    if (observer) {
      observer.disconnect();
    }
    $elements.css('--reveal-delay', '0ms').addClass('is-visible');
  }

  function revealElement(element, delay = 0) {
    $(element).css('--reveal-delay', delay + 'ms').addClass('is-visible');
  }

  try {
    observer = new IntersectionObserver(function handleIntersections(entries) {
      // Restart the 70ms stagger for each group entering together. Cards
      // entering later (for example on mobile) do not inherit an old delay.
      const groupCounts = new Map();

      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          $(entry.target).css('--reveal-delay', '0ms').removeClass('is-visible');
          return;
        }

        const element = entry.target;
        const group = element.parentElement;
        let delay = 0;

        if (group.hasAttribute('data-reveal-group')) {
          const index = groupCounts.get(group) || 0;
          delay = index * 70;
          groupCounts.set(group, index + 1);
        }

        revealElement(element, delay);
      });
    }, { threshold: 0 });

    // Register every target before hiding anything: failure leaves readable
    // content, and neither JavaScript nor jQuery is required for visibility.
    $elements.each(function () {
      observer.observe(this);
    });
    $elements.addClass('reveal');
  } catch (error) {
    revealAll();
    $elements.removeClass('reveal');
    return;
  }

  $document.on('focusin.landingReveal', '[data-reveal]', function handleRevealFocus() {
    revealElement(this);
  });

  // Honor a preference change immediately, including during a stagger.
  function onMotionChange(event) {
    if (event.matches) {
      revealAll();
    }
  }

  if (motionPreference.addEventListener) {
    motionPreference.addEventListener('change', onMotionChange);
  } else if (motionPreference.addListener) {
    motionPreference.addListener(onMotionChange);
  }
}());
