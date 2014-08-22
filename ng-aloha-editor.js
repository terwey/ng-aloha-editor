'use strict';


/**
* This AngularJS Directive is to allow easy usage of the Aloha Editor inside an AngularJS project.
*
* @class ngAlohaEditor
*/

/*
Props to https://github.com/esvit/ng-ckeditor for a nice example to implement an editor
*/

var module = angular.module('ngAlohaEditor', []);


if (typeof ngAlohaEditorConfig === 'undefined') {
    var ngAlohaEditorConfig = { baseUrl: '' };
}

/**
* Defines the configuration for the Directive
*
* @example
* var ngAlohaEditorConfig = { baseUrl: 'bower_components/ng-aloha-editor/' };
*
* @property ngAlohaEditorConfig 
* @type Array
**/

Aloha = window.Aloha || {};
Aloha.settings = Aloha.settings || {};

var DirectiveSettings = {
    baseUrl: ngAlohaEditorConfig.baseUrl + 'libs/alohaeditor-0.23.26/aloha/lib',
    logLevels: {'error': true, 'warn': true, 'info': false, 'debug': false},
    errorhandling : false
};

jQuery.extend(Aloha.settings, DirectiveSettings)

module.directive('aloha', ['$location', '$rootScope', function ($location, $rootScope) {
    var count = 0;
    var fromAloha = false;

    /**
    * Because AngularJS would route clicks on any links, but we
    * want the user to be able to click on links so he can edit them.
    *
    * Comment and method taken from: https://groups.google.com/d/msg/angular/g3eNa360oMo/0-plw8zm-okJ
    *
    * @method preventAngularRouting
    * @param {Object} elem DOM Element with Aloha bound to it
    * @return {boolean} false
    **/
    function preventAngularRouting(elem) {
        Aloha.jQuery(elem).click(function (e) {
            return false;
        });
    }

    /**
    * @method replaceAngularLinkClickHandler
    * @param {Object} elem DOM Element with Aloha bound to it
    **/
    function replaceAngularLinkClickHandler(elem) {
        preventAngularRouting(elem);
        Aloha.jQuery(elem).on('click', 'a', function (e) {
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

    /**
    * Also, we don't want the default ctrl+click behaviour of aloha, which 
    * is to do window.location.href = href because that would reload the page.
    *
    * Comment and method taken from: https://groups.google.com/d/msg/angular/g3eNa360oMo/0-plw8zm-okJ
    *
    * @method disableAlohaCtrlClickHandler
    **/
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
            alohaContent: '='
        },
        link: function (scope, elem, attrs) {
            var elementId = "" + count++;
            var uniqeClass = "angular-aloha-element" + elementId;
            var firstTime = false;
            elem[0].classList.add(uniqeClass);
            elem.data("ng-aloha-element-id", elementId);
            // Because Aloha is slow in initialising it's Editor, 
            // we have to set the Content manually before
            if (!Aloha.jQuery.trim( Aloha.jQuery(elem).html()).length) {
                firstTime = true;
                Aloha.jQuery(elem).html(scope.alohaContent);
            }
            Aloha.ready(function () {

                /**
                * The Text Editor Javascript is Loaded and Ready
                * @event texteditor-js-ready
                **/
                scope.$emit('texteditor-js-ready');

                if (!elem.hasClass("aloha-editable")) {
                    alohaElement(elem);
                }

                /**
                * The Text Editor has been bound to the object
                * @event texteditor-ready
                * @param {Object} Element DOM Element that Aloha has bound to
                **/
                scope.$emit('texteditor-ready', elem);

                scope.$watch('alohaContent', function() {
                    // Check if the change comes from inside of Aloha
                    if (!fromAloha) {
                        if (!firstTime) {
                            firstTime = false;
                            Aloha.getEditableById(elem.attr('id')).setContents(scope.alohaContent);
                        }
                    }
                });

                Aloha.bind('aloha-selection-changed', function (jQueryEvent, alohaEditable) {
                    var ae = jQueryEvent.target.activeEditable;
                    if (ae && ae.originalObj[0].id === elem.attr('id')) {
                        /**
                        * The Text Editor has detected a change in it's selection
                        * @event texteditor-selection-changed
                        * @param {Object} jQueryEvent jQuery Event
                        * @param {Object} alohaEditable DOM Element that Aloha has bound to
                        **/
                        scope.$emit('texteditor-selection-changed', jQueryEvent, alohaEditable);
                    }
                });

                Aloha.bind('aloha-editable-deactivated', function(jQueryEvent, alohaEditable) {
                    var ae = jQueryEvent.target.activeEditable;
                    if (ae && ae.originalObj[0].id === elem.attr('id')) {
                        /**
                        * The Text Editor had deactivated editability
                        * @event texteditor-editable-deactivated
                        * @param {Object} jQueryEvent jQuery Event
                        * @param {Object} alohaEditable DOM Element that Aloha has bound to
                        **/
                        scope.$emit('texteditor-editable-deactivated', jQueryEvent, alohaEditable);
                    }
                });

                Aloha.bind('aloha-smart-content-changed', function(jQueryEvent, alohaEditable) {
                    var ae = jQueryEvent.target.activeEditable;

                    // Reset {bool} fromAloha to the false state
                    fromAloha = false;

                    if (ae && ae.originalObj[0].id === elem.attr('id')) {
                        scope.alohaContent = alohaEditable.editable.getContents();
                        fromAloha = true;
                        $rootScope.$$phase || $rootScope.$apply();

                        /**
                        * The Text Editor has detected a change in it's content
                        * @event texteditor-content-changed
                        * @param {Object} jQueryEvent jQuery Event
                        * @param {Object} alohaEditable DOM Element that Aloha has bound to
                        **/
                        scope.$emit('texteditor-content-changed', jQueryEvent, alohaEditable);
                    }
                });

                Aloha.bind('aloha-command-executed', function(jQueryEvent, eventArgument) {
                    var ae = jQueryEvent.target.activeEditable;
                    if (ae && ae.originalObj[0].id === elem.attr('id')) {
                        /**
                        * The Text Editor has executed a command
                        * @event texteditor-command-executed
                        * @param {String} eventArgument executed command name
                        **/
                        scope.$emit('texteditor-command-executed', eventArgument);
                    }
                });
            });

            replaceAngularLinkClickHandler(elem);
        }
    };
}]);
