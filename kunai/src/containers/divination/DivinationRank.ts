class DivinationRank extends eui.ItemRenderer {
    private dataList: eui.List
    private rspdata: Array<any> = new Array<any>()
    private scroller: eui.Scroller
    private startindex: number = 0
    private endindex: number = this.startindex + 5
    private stopload: boolean = false
    private loading: boolean = false

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
        this.skinName = "resource/eui_skins/DivinationRankSkin.exml"
        this.dataList.itemRenderer = DivinationRankItem


        const { stage } = egret.MainContext.instance
        this.width = stage.stageWidth
        this.height = stage.stageHeight - 90
    }

    public loadData() {
        Http.get(this, API.ApiDivinationRank).then(res => {
            // unknown转any
            var rsp: any = res

            this.bindData(rsp.ranks)
        })
    }


    /** 进行数据绑定 */
    public bindData(data: Array<any>): void {
        let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(data);
        this.dataList.dataProvider = arrCollection;
    }
}

class DivinationRankItem extends eui.ItemRenderer {
    private nickname: eui.Label = null;
    private portrait: eui.Image = null;
    private num: eui.Label = null;
    private rank: eui.Label = null;

    public constructor() {
        super();
        this.skinName = "resource/eui_skins/DivinationRankItemSkin.exml";
    }

    protected createChildren(): void {
        super.createChildren();
    }

    protected dataChanged(): void {
        this.loadData();
    }

    private loadData(): void {
        this.nickname.text = this.data.nickname
        this.num.text = this.data.num
        this.rank.text = this.data.rank
        const imgLoader = new egret.ImageLoader()
        imgLoader.load(this.data.portrait)
        imgLoader.once(egret.Event.COMPLETE, (e: egret.Event) => {
            if (e.currentTarget.data) {
                const texture = new egret.Texture()
                texture.bitmapData = e.currentTarget.data
                this.portrait.texture = texture
            }
        }, this)
    }
}