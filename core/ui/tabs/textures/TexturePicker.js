(function () {
    var ui = glinamespace("gli.ui");

    var TexturePicker = function (context, name) {
        glisubclass(gli.ui.PopupWindow, this, [context, name, "Texture Browser", 610, 600]);
    };

    TexturePicker.prototype.setup = function () {
        var self = this;
        var context = this.context;
        var doc = this.browserWindow.document;
        var gl = context;

        this.previewer = new gli.ui.TexturePreviewGenerator();
        
        // Append textures already present
        this.previewer.beginBuilding();
        var textures = context.resources.getTextures();
        for (var n = 0; n < textures.length; n++) {
            var texture = textures[n];
            var el = this.previewer.buildItem(this, doc, gl, texture, true);
            this.elements.innerDiv.appendChild(el);
        }
        this.previewer.endBuilding();

        // Listen for changes
        context.resources.resourceRegistered.addListener(this, this.resourceRegistered);
    };
    
    TexturePicker.prototype.dispose = function () {
        this.context.resources.resourceRegistered.removeListener(this);
    };
    
    TexturePicker.prototype.resourceRegistered = function (resource) {
        var doc = this.browserWindow.document;
        var gl = context;
        if (glitypename(resource.target) == "WebGLTexture") {
            var el = this.previewer.buildItem(this, doc, gl, resource, true);
            this.elements.innerDiv.appendChild(el);
        }
    };

    ui.TexturePicker = TexturePicker;
})();
