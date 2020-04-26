class PublicDivination extends eui.ItemRenderer {
    private back: eui.Image

    private divination: eui.EditableText
    private publicbtn: eui.Button
    private noname: eui.CheckBox
    private isnoname: boolean

    constructor() {
        super()
        this.init()
    }

    private init() {
        // 创建场景
        this.createScene()
    }

    private createScene() {
        this.skinName = "resource/eui_skins/PublicDivinationSkin.exml";

        const { stage } = egret.MainContext.instance

        this.width = stage.stageWidth
        this.height = stage.stageHeight - 90;
        if (!Config.Ad) {
            this.height = stage.stageHeight
        }

        // 增加按钮事件
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.delete()
        }, this)

        this.publicbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onPublicDivination()
        }, this)

        this.noname.addEventListener(
            eui.UIEvent.CHANGE,
            (evt: eui.UIEvent) => {
                egret.log(evt.target.selected);
                this.isnoname = evt.target.selected
            }, this
        );
    }

    private delete() {
        if (this.parent) {
            this.parent.removeChild(this)
        }
    }

    private onPublicDivination() {
        if (this.divination.text == "") {
            Msg.showMsg(this, "请输入完整信息")
            return
        }

        console.log("text:", this.divination.text)
        var data = {
            content: this.divination.text,
            noname: this.isnoname
        }
        Http.post(this, API.ApiDivinationPublic, data).then(() => {
            Msg.showMsg(this, "发布吐槽成功，一定有人会翻到哟！")
            this.divination.text = ""
            this.isnoname = false
            return
        })
    }
}