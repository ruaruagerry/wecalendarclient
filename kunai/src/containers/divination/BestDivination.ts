class BestDivination extends eui.ItemRenderer {
    private back: eui.Image
    private nickname: eui.Label
    private content: eui.Label
    private portrait: eui.Image

    constructor() {
        super()
        this.init()
    }

    private init() {
        // 创建场景
        this.createScene()
    }

    private createScene() {
        this.skinName = "resource/eui_skins/BestDivinationSkin.exml";

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
    }

    private delete() {
        if (this.parent) {
            this.parent.removeChild(this)
        }
    }

    public loadData(data: any) {
        this.nickname.text = data.nickname
        this.content.text = data.content
        // 加载头像
        const imgLoader = new egret.ImageLoader()
        imgLoader.load(data.portrait)
        imgLoader.once(egret.Event.COMPLETE, (e: egret.Event) => {
            if (e.currentTarget.data) {
                const texture = new egret.Texture()
                texture.bitmapData = e.currentTarget.data
                this.portrait.texture = texture
            }
        }, this)
    }
}