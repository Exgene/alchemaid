<div class="container flex px-3 pb-3 pt-1">
	<div class="ball ball1"></div>
	<div class="ball ball2"></div>
	<div class="ball ball3"></div>
</div>

<style>
	.container {
		display: flex;
		width: 60px;
		justify-content: space-between;
		height: 20px;
		align-items: flex-end;
	}
	.ball {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		animation: bounce 1.2s infinite ease-in-out;
	}

	.ball1 {
	}
	.ball2 {
		animation-delay: 0.2s;
	}
	.ball3 {
		animation-delay: 0.4s;
	}

	@keyframes bounce {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(0, -10px);
			background: #ccc;
		}
		50% {
			transform: translate(0, -10px);
			background: #72c2c2;
		}
		40% {
			transform: translate(0, 3px);
		}
		50% {
			transform: translate(0, 0px);
		}
	}
</style>
