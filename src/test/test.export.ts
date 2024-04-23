import { KnContextInfo } from "../models/AssureAlias";
import { ExportHandler } from "../handlers/ExportHandler";
import { ExportRouter } from "../routers/ExportRouter";

let ctx : KnContextInfo = { params: { }, meta: { } };
let handler = new ExportHandler();
handler.export(ctx).then((rs) => {
    let router = new ExportRouter();
    router.doExport(ctx).then((filename) => {
        console.log("filename",filename);
    });
});
