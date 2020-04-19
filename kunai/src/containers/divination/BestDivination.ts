class BestDivination extends eui.ItemRenderer {
    private back: eui.Image

    constructor() {
        super()
        this.init()
    }

    private init() {
        // 创建场景
        this.createScene()
        // 加载数据
        this.loadData()
    }

    private createScene() {
        this.skinName = "resource/eui_skins/BestDivinationSkin.exml";

        const { stage } = egret.MainContext.instance

        this.width = stage.stageWidth
        this.height = stage.stageHeight - 90;

        // 增加按钮事件
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.delete()
        }, this)
    }

    private delete() {
        if (this.parent) {
            this.parent.removeChild(this)
        }
    }

    private loadData() {
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