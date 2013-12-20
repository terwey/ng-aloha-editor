# ngAlohaEditor
## Introduction
This ```AngularJS``` ```Directive``` is to allow easy usage of the ```Aloha Editor``` inside an ```AngularJS``` project. 


## Configuring
Please add this in the ```<head>``` of your ```index.html``` (or equivalent) to configure the ```ngAlohaEditor``` Directive so it knows how to load it's dependencies.

* ```PATH_TO_BOWER``` depends on your environment.
* ```ng-aloha-editor``` can also depend on how you installed it in your project, change accordingly.

*IMPORTANT* the ```baseUrl``` MUST to end with a forward-slash ```/```


```html
<script src="PATH_TO_BOWER/requirejs/require.js"></script>
<script>
var ngAlohaEditorConfig = { baseUrl: 'PATH_TO_BOWER/ng-aloha-editor/' };
</script>
```

This can be placed inside your ```build:js``` or equivalent section. Just make sure it's after the previous code.


```html
<script src="PATH_TO_BOWER/ng-aloha-editor/ng-aloha-editor.js"></script>
```