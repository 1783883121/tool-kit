export default class ReqConfig {
    constructor() { };
    // 后端返回数据 code filter
    resCodeFilter = (stateCode) => {
        new Promise(resolve => {
            switch (stateCode) {
                case '405':
                    this.code405();
                    break;
            }
            resolve();
            const code405 = () => {
                uni.showModal({
                    content: "您还未登录/登录过期，请登录之后再进行操作",
                    success: (response) => {
                        if (response.confirm) {
                            uni.switchTab({
                                url: "/pages/tabber/my",
                            })
                        }

                    },
                });
            }
        })
    };
    // 系统code filter
    systemCodeFilter = (stateCode) => {
        new Promise(resolve => {
            switch (stateCode) {
                case '500':
                    this.code500();
                    break;
            }
            resolve();
            const code500 = () => {
                uni.showToast({
                    title: "服务端错误❌!",
                    icon: "none",
                    duration: 1500
                })
            }
        })
    };

}