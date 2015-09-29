import observable = require("data/observable");
import gridModule = require("ui/layouts/grid-layout");
import utils = require("utils/utils");
import models = require("./view-model");
import frame = require("ui/frame");

export function rootGridLoaded(args: observable.EventData) {
    var grid = <gridModule.GridLayout>args.object;

    if (grid.android) {
        var compat = <any>android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

function loadItem(page, item: models.ChartTypeItem) {
    var dataModel = page.bindingContext;
    dataModel.loadGalleryFragment(item, page.getViewById("exampleHolder"), "~/examples/chart/line", item.exampleXml);
}

export function onPageLoaded(args: observable.EventData) {
    var page = args.object;
    var dataModel = new models.ChartExamplesDataModel();
    page.bindingContext = dataModel;
    var itemToLoad = dataModel.lineTypes[0];
    loadItem(page, itemToLoad);
}

export function repeaterItemTap(args: observable.EventData) {
    var item = args.view.bindingContext;
    var page = frame.topmost().currentPage;
    loadItem(page, item);
}
