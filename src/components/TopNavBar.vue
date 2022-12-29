<template>
	<div class="topbar">
		<div class="container">
			<div class="left">
				<div class="item">
					<router-link to="/">
						<span class="text">Cardinal</span>
					</router-link>
				</div>
			</div>
			<div class="right">
				<div class="item">
					<router-link to="/settings">
						<span class="text">Settings</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.topbar {
	// position: fixed;
	top: 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 8px;

	height: fit-content;
	// min-height: fit-content;
	// max-height: 120px;
	// TODO : min and max height
	width: 100%;
}

.container {
	/* Auto layout */
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 4px 24px;

	width: 100%;
	height: fit-content;

	border: 1px solid $black;
	border-radius: 8px;

	/* Inside auto layout */
	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 1;

	.left {
		/* Auto layout */
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px;
		gap: 16px;

		width: 50%;
		height: fit-content;

		/* Inside auto layout */
		flex: none;
		order: 0;
		align-self: stretch;
		flex-grow: 1;
	}

	.right {
		/* Auto layout */
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0px;

		width: 50%;
		height: fit-content;

		/* Inside auto layout */
		flex: none;
		order: 1;
		align-self: stretch;
		flex-grow: 1;
	}

	.item {
		/* Auto layout */
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px;

		width: fit-content;
		height: fit-content;

		/* Inside auto layout */
		flex: none;
		order: 0;
		flex-grow: 0;

		.text {
			font-size: 1rem;
		}
	}
}
</style>
