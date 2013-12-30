var ngAlohaEditorConfig = {
    baseUrl: 'base/'
}
require.config({
    paths: {
        aloha: ngAlohaEditorConfig.baseUrl + 'libs/alohaeditor-0.23.26/aloha/lib/aloha'
    }
});
Aloha = window.Aloha || {};
Aloha.settings = Aloha.settings || {};
Aloha.settings.jQuery = window.jQuery.noConflict(true);
