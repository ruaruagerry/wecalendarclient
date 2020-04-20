class Divination extends eui.ItemRenderer {
    private frontlabel: eui.Label
    private frontrect: eui.Rect
    private frontname: eui.Label
    private front: eui.Image
    private imageback: eui.Image
    private switchbtn: eui.Button

    private divinationrank: DivinationRank
    private rankbtn: eui.Button
    private isshowrank: boolean
    private rankshape: egret.Shape

    private publicdivination: PublicDivination
    private publicbtn: eui.Button

    private bestdivination: BestDivination
    private bestbtn: eui.Button

    private isclose: boolean = true

    constructor() {
        super()
        this.init()
    }

    private init() {
        // 创建场景
        this.createScene()
    }

    private createScene() {
        this.skinName = "resource/eui_skins/DivinationSkin.exml";

        const { stage } = egret.MainContext.instance

        this.width = stage.stageWidth
        this.height = stage.stageHeight - 90

        this.switchbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDraw, this)
        this.publicbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPublicDivination, this)
        this.rankbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDivinationRank, this)
        this.bestbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBestDivination, this)
    }

    private onDraw() {
        this.switchbtn.enabled = false
        if (this.isclose) {
            this.openDivination()
        } else {
            this.closeDivination()
        }
    }

    private openDivination() {
        this.imageback.scaleX = 1;
        this.frontlabel.scaleX = 0;
        this.frontrect.scaleX = 0;
        this.frontname.scaleX = 0;
        this.front.scaleX = 0;
        egret.Tween.get(this.imageback).to({ scaleX: 0 }, 3000, egret.Ease.backIn).call(() => {
            egret.Tween.get(this.frontlabel).to({ scaleX: 1 }, 3000, egret.Ease.backOut);
            egret.Tween.get(this.frontrect).to({ scaleX: 1 }, 3000, egret.Ease.backOut);
            egret.Tween.get(this.frontname).to({ scaleX: 1 }, 3000, egret.Ease.backOut);
            egret.Tween.get(this.front).to({ scaleX: 1 }, 3000, egret.Ease.backOut);
            this.isclose = false
            this.switchbtn.label = "关闭"
            egret.setTimeout(() => {
                this.switchbtn.enabled = true
            }, this, 5000, "egret");
        })
    }

    private closeDivination() {
        egret.Tween.get(this.frontlabel).to({ scaleX: 0 }, 1000, egret.Ease.backOut);
        egret.Tween.get(this.frontname).to({ scaleX: 0 }, 1000, egret.Ease.backOut);
        egret.Tween.get(this.frontrect).to({ scaleX: 0 }, 1000, egret.Ease.backOut);
        egret.Tween.get(this.front).to({ scaleX: 0 }, 1000, egret.Ease.backOut).call(() => {
            egret.Tween.get(this.imageback).to({ scaleX: 1 }, 1000, egret.Ease.backIn)
            this.isclose = true
            this.switchbtn.label = "翻吐槽"
            egret.setTimeout(() => {
                this.switchbtn.enabled = true
            }, this, 1000, "egret");
        })
    }


    private onPublicDivination() {
        this.publicdivination = new PublicDivination()
        this.addChild(this.publicdivination)
    }

    private onBestDivination() {
        this.bestdivination = new BestDivination()
        this.addChild(this.bestdivination)
    }

    private onDivinationRank() {
        if (this.isshowrank) {
            return
        }
        this.createClickable()
        this.divinationrank = new DivinationRank()
        // this.divinationrank.x = this.imageback.x
        // this.divinationrank.y = this.imageback.y
        this.addChild(this.divinationrank)
        this.isshowrank = true
    }

    private createClickable() {
        const { stage } = egret.MainContext.instance
        this.rankshape = new egret.Shape()
        this.rankshape.graphics.beginFill(0x000000, 0)
        this.rankshape.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight - 90)
        this.rankshape.graphics.endFill()
        this.addChild(this.rankshape)
        this.rankshape.touchEnabled = true
        this.rankshape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteRank, this)
    }

    private onDeleteRank() {
        if (this.isshowrank) {
            this.removeChild(this.divinationrank)
            this.removeChild(this.rankshape)
            this.isshowrank = false
        }
    }
}