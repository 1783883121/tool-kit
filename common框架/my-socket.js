export default class ZSockets {
	constructor(arg) {
		// 是否连接
		this.isConnect = false;
	}
	// 连接
	connect(name) {
		uni.showToast({
			title: '正在连接中~',
			icon: 'none',
			duration: 2000
		});

		return new Promise(resolve => {
			uni.connectSocket({
				url: `ws://localhost:3000/conectWs?name=${name}`,
				complete: () => {
					uni.onSocketError(e => {
						uni.showToast({
							title: 'WebSocket连接失败，请检查！',
							icon: 'none',
							duration: 2000
						});
						this.isConnect = false;
					});
					uni.onSocketOpen(e => {
						uni.showToast({
							title: 'WebSocket已连接',
							icon: 'none',
							duration: 2000
						});
						this.isConnect = true;
						resolve();
					});
				}
			});
		}).then(res => {
			uni.onSocketClose(res => {
				uni.showToast({
					title: '连接已断开！',
					icon: 'none',
					duration: 2000
				});
				this.isConnect = false;
			});
		})

	}
	onMessages(backfunction) {
		if (!this.isConnect) {
			uni.showToast({
				title: "socket未连接！",
				icon: "none"
			});
			return;
		}
		return uni.onSocketMessage(backfunction);
	}
	close() {
		uni.closeSocket({
			success: res => {
				uni.showToast({
					title: '连接已关闭',
					icon: 'none',
					duration: 2000
				});
				this.isConnect = false;
			},
			fail: e => {
				console.log(e);
			}
		});
	}
	// 发送消息，通信
	// type  1 单发   2群发   3 广播
	// sendMsg(type = 1, recipient) {
	// 	const sendData = {
	// 		type: type,
	// 		msg: this.msg,
	// 		recipient: 'zhang',
	// 		sender: this.user
	// 	};
	// 	uni.sendSocketMessage({
	// 		data: JSON.stringify(sendData),
	// 		success: () => {
	// 			uni.showToast({
	// 				title: '发送成功！',
	// 				icon: 'none',
	// 				duration: 2000
	// 			});
	// 		}
	// 	});
	// }
	//
	/**发送信息
	 * @param {Object} methodName  方法名
	 * @param {Object} data 		参数
	 */
	send(methodName, data = {}) {
		data.methodname = methodName;
		return new Promise(resolve => {
			uni.sendSocketMessage({
				data: JSON.stringify(data),
				success: () => {
					// uni.showToast({
					// 	title: '发送成功！',
					// 	icon: 'none',
					// 	duration: 2000
					// });
					resolve(1)
				},
				fail(err) {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
					resolve(0)
				}
			});
		})
	}
}
