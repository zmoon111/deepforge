/*globals define, _, WebGMEGlobal*/
/*jshint browser: true*/
/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Tue May 17 2016 11:25:46 GMT-0400 (EDT).
 */

define([
    'deepforge/viz/RenameablePanel',
    'widgets/ArchEditor/ArchEditorWidget',
    './ArchEditorControl'
], function (
    RenameablePanel,
    ArchEditorWidget,
    ArchEditorControl
) {
    'use strict';

    var ArchEditorPanel;

    ArchEditorPanel = function (layoutManager, params) {
        var options = {};
        //set properties from options
        options[RenameablePanel.OPTIONS.LOGGER_INSTANCE_NAME] = 'ArchEditorPanel';
        options[RenameablePanel.OPTIONS.FLOATING_TITLE] = true;

        //call parent's constructor
        RenameablePanel.apply(this, [options, layoutManager]);

        this._client = params.client;
        this._embedded = params.embedded;

        //initialize UI
        this._initialize();

        this.logger.debug('ctor finished');
    };

    _.extend(ArchEditorPanel.prototype, RenameablePanel.prototype);

    ArchEditorPanel.prototype._initialize = function () {
        var self = this;

        //set Widget title
        this.setTitle('');

        this.widget = new ArchEditorWidget(this.logger, this.$el);

        this.widget.setTitle = function (title) {
            self.setTitle(title);
        };

        this.control = new ArchEditorControl({
            logger: this.logger,
            client: this._client,
            embedded: this._embedded,
            widget: this.widget
        });

        this.initializeRenameable();
        this.onActivate();
    };

    /* OVERRIDE FROM WIDGET-WITH-HEADER */
    /* METHOD CALLED WHEN THE WIDGET'S READ-ONLY PROPERTY CHANGES */
    ArchEditorPanel.prototype.onReadOnlyChanged = function (isReadOnly) {
        //apply parent's onReadOnlyChanged
        RenameablePanel.prototype.onReadOnlyChanged.call(this, isReadOnly);

    };

    ArchEditorPanel.prototype.onResize = function (width, height) {
        this.logger.debug('onResize --> width: ' + width + ', height: ' + height);
        this.widget.onWidgetContainerResize(width, height);
    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    ArchEditorPanel.prototype.destroy = function () {
        this.control.destroy();
        this.widget.destroy();

        RenameablePanel.prototype.destroy.call(this);
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    ArchEditorPanel.prototype.onActivate = function () {
        this.widget.onActivate();
        this.control.onActivate();
        WebGMEGlobal.KeyboardManager.setListener(this.widget);
        WebGMEGlobal.Toolbar.refresh();
    };

    ArchEditorPanel.prototype.onDeactivate = function () {
        this.widget.onDeactivate();
        this.control.onDeactivate();
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    return ArchEditorPanel;
});
