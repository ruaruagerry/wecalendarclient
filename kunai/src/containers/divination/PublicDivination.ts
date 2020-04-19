class PublicDivination extends eui.ItemRenderer {
    private back: eui.Image

    private divination: eui.EditableText
    private publicbtn: eui.Button
    private noname: eui.CheckBox

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

        // 增加按钮事件
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.delete()
        }, this)

        this.publicbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onPublicDivination()
        }, this)
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
        // var data = {
        //     phone: this.phone.text,
        //     code: this.code.text,
        // }
        // Http.post(this, API.ApiPhoneBind, data).then(res => {
        //     if (res == undefined) {
        //         Msg.showMsg(this, "绑定成功")
        //         this.tip.text = "已绑定手机号码"
        //         this.phone.enabled = false
        //         this.code.text = ""
        //         this.code.enabled = false
        //         this.code.alpha = 0
        //         this.getcodebtn.enabled = false
        //         this.getcodebtn.alpha = 0
        //         this.bindbtn.enabled = false
        //         this.modifybindbtn.enabled = true
        //         return
        //     }
        // })
    }
}