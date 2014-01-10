# ngAlohaEditor
## Introduction
This ```AngularJS``` ```Directive``` is to allow easy usage of the ```Aloha Editor``` inside an ```AngularJS``` project. 


## Configuring
Please add this in the ```<head>``` of your ```index.html``` (or equivalent) to configure the ```ngAlohaEditor``` Directive so it knows how to load it's dependencies.

* ```PATH_TO_BOWER``` depends on your environment.
* ```ng-aloha-editor``` can also depend on how you installed it in your project, change accordingly.

*IMPORTANT* the ```baseUrl``` MUST to end with a forward-slash ```/```


```html
<script src="PATH_TO_BOWER/ng-aloha-editor/libs/alohaeditor-0.23.26/aloha/lib/require.js"></script>
<script src="PATH_TO_BOWER/ng-aloha-editor/libs/alohaeditor-0.23.26/aloha/lib/vendor/jquery-1.7.2.js"></script>
<script type="text/javascript">
    var Aloha = window.Aloha || ( window.Aloha = {} );
	// Load your Plugins here, can't be done after Aloha has loaded
    Aloha.settings = {
        plugins: {
            load: "common/ui, common/format, common/paste, common/block, common/list, common/table, extra/draganddropfiles, common/image"
        }
    }
</script>
<script src="PATH_TO_BOWER/ng-aloha-editor/libs/alohaeditor-0.23.26/aloha/lib/aloha.js"></script>
<script>
var ngAlohaEditorConfig = { baseUrl: 'PATH_TO_BOWER/ng-aloha-editor/' };
</script>
```

This can be placed inside your ```build:js``` or equivalent section. Just make sure it's after the previous code.


```html
<script src="PATH_TO_BOWER/ng-aloha-editor/ng-aloha-editor.js"></script>
```

## Test

You can install the dependencies and test the directive running the
following commands from the repo directory:

    $ npm install
    $ bower install
    $ npm test

As an alternative to `npm test`, you can use `karma start` to keep the
tests going in the background.

## Support
If you have any questions or would just like to participate in on the chat join the channel ```#newscoop``` on the Freenode (irc.freenode.net) network and ask!