'use strict';

var app = angular.module('ngAlohaEditor', []);
/*
Thanks goes out to https://groups.google.com/d/msg/angular/g3eNa360oMo/0-plw8zm-okJ
Also props to https://github.com/esvit/ng-ckeditor for a nice example to implement an editor
*/
console.log(ngAlohaEditorConfig);

require.config({
    paths: {
        aloha: ngAlohaEditorConfig.baseUrl + 'libs/alohaeditor-0.23.26/aloha/lib/aloha'
    }
});

require(['aloha']);

var Aloha = window.Aloha || {};

Aloha.settings = {
    baseUrl: ngAlohaEditorConfig.baseUrl + 'libs/alohaeditor-0.23.26/aloha/lib',
    load: "common/ui, common/format, common/paste, common/block, common/list, common/table, extra/draganddropfiles, common/image",
    logLevels: {'error': true, 'warn': true, 'info': false, 'debug': false},
    errorhandling : true
};

app.directive('aloha', ['$location', '$rootScope', function ($location, $rootScope) {
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
            var elementId = "" + count++;
            var uniqeClass = "angular-aloha-element" + elementId;
            elem[0].classList.add(uniqeClass);
            elem.data("ng-aloha-element-id", elementId);
            Aloha.ready(function () {
                $rootScope.$broadcast('texteditor-js-ready');
                alohaElement(elem);
                $rootScope.$broadcast('texteditor-ready', elem);
                Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent);

                Aloha.bind('aloha-selection-changed', function (jqueryEvent, alohaEditable) {
                    $rootScope.$broadcast('texteditor-selection-changed', jqueryEvent, alohaEditable);
                });

                Aloha.bind('aloha-smart-content-changed', function(jqueryEvent, alohaEditable) {
                    $rootScope.$broadcast('texteditor-content-changed', jqueryEvent, alohaEditable);
                    // if (jData.editable.obj.data("ng-aloha-element-id") === elementId) {
                        console.log(scope);
                        scope.alohaContent = alohaEditable.editable.getContents();
                        console.log(scope);
                        scope.$apply();
                    // }
                });
            });

            replaceAngularLinkClickHandler(elem);
        }
    };
}]);