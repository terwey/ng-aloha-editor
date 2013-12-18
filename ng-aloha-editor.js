'use strict';

angular.module('authoringEnvironmentApp')
/*
Thanks goes out to https://groups.google.com/d/msg/angular/g3eNa360oMo/0-plw8zm-okJ
*/
  .directive('aloha', ['$location', 'AlohaFormattingFactory', function ($location, AlohaFormattingFactory) {
    var count = 0;

    // Because angularjs would route clicks on any links, but we
    // want the user to be able to click on links so he can edit
    // them.
    function preventAngularRouting(elem) {
        elem.click(function (e) {
            return false;
        });
    }

    function replaceAngularLinkClickHandler(elem) {
        preventAngularRouting(elem);
        $(elem).on('click', 'a', function (e) {
            var href = $(this).attr('href');
            // Use metaKey for OSX and ctrlKey for PC.
            if (e.metaKey || e.ctrlKey) {
                if ('/' === href.charAt(0)) {
                    // Relative links withing the angular app.
                    $location.url(href);
                    e.preventDefault();
                } else {
                    // Absolute links pointing outside the angular app.
                    window.location.href = href;
                }
            }
        });
    }

    // Also, we don't want the default ctrl+click behaviour of aloha,
    // which is to do window.location.href = href because that would
    // reload the page.
    function disableAlohaCtrlClickHandler() {
        Aloha.ready(function () {
            Aloha.bind('aloha-editable-activated', function (event, msg) {
                // There is no simple way to disable Aloha's ctrl-click
                // behaviour. We know the handler is bound when the editable
                // is activated, and with the timeout we make sure it is
                // unbound again afterwards.
                var editable = msg.editable;
                setTimeout(function () {
                    editable.obj.unbind('click.aloha-link.meta-click-link');
                }, 10);
            });
        });
    }

    function alohaElement(element) {
        Aloha.ready(function () {
            Aloha.jQuery(element).aloha();
        });
    }
    function mahaloElement(element) {
        Aloha.ready(function () {
            Aloha.jQuery(element).mahalo();
        });
    }

    // Only do once for each page load.
    disableAlohaCtrlClickHandler();

    return {
        // Because we want to ensure that all directives on the element
        // will be honored, but all directives on descendant elements
        // will be considered non-bindable (priority -1000 and terminal
        // true). Necessary because the content may come prefilled from
        // the server.
        priority: -1000,
        terminal: true,
        scope: {
            alohaContent: '@alohaContent'
        },
        link: function (scope, elem, attrs) {
            console.log(scope.alohaContent);
            var elementId = "" + count++;
            var uniqeClass = "angular-aloha-element" + elementId;
            elem[0].classList.add(uniqeClass);
            elem.data("ng-aloha-element-id", elementId);
            Aloha.ready(function () {
                alohaElement(elem);
                Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent);
                // $(elem).aloha();
                // this could go in the directive that it checks itself, we might have to benchmark this
                Aloha.bind('aloha-selection-changed', function () {
                    angular.forEach(AlohaFormattingFactory.get(), function(value, key) {
                        var selected = Aloha.queryCommandState(value);
                        jQuery('.editoricon-'+value.toLowerCase()).parent().toggleClass('active', selected);
                    });
                });
                // scope.$on('$destroy', function () {
                //     $(elem).mahalo();
                // });
                Aloha.bind('aloha-smart-content-changed', function(jEvent, jData) {
                    // if (jData.editable.obj.data("ng-aloha-element-id") === elementId) {
                        console.log(scope);
                        scope.alohaContent = jData.editable.getContents();
                        console.log(scope);
                        scope.$apply();
                    // }
                });
            });

            replaceAngularLinkClickHandler(elem);
        }
    };
}]);
