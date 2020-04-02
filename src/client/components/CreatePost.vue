<template lang="html">
	<div class="form-wrapper">
		<form name="create-post" @submit.prevent="submitForm">
			<h2 class="form-title">Write a post</h2>
			<p><label id="title-description" for="title">Title</label></p>
			<p>
				<input
					aria-describedby="title-description"
					autocomplete="off"
					:disabled="disableInput"
					id="input-title"
					name="title"
					required
					type="text"
					v-model.trim="title"
				/>
			</p>
			<p><label id="body-description" for="body">Body</label></p>
			<p>
				<textarea
					aria-describedby="body-description"
					autocomplete="off"
					:disabled="disableInput"
					id="input-body"
					name="body"
					required
					v-model.trim="body"
				></textarea>
			</p>
			<p><button id="submit-post" type="submit" :disabled="disableSubmit">Save</button></p>
			<transition name="zoom" mode="out-in">
				<p v-if="showStartOver"><button type="reset" @click="resetForm">Start over</button></p>
			</transition>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { AjaxState, UIState } from '../types';

@Component
export default class CreatePost extends Vue {
	@Action('setAjaxMessage', { namespace: 'CreatePostStore' }) private setAjaxMessage;
	@Action('setAjaxStatus', { namespace: 'CreatePostStore' }) private setAjaxStatus;
	@Action('setBody', { namespace: 'CreatePostStore' }) private setBody;
	@Action('setTitle', { namespace: 'CreatePostStore' }) private setTitle;
	@Action('submitPost', { namespace: 'CreatePostStore' }) private submitPost;

	@Getter('getNotificationDuration') private notificationDuration;

	@Getter('getAjaxMessage', { namespace: 'CreatePostStore' }) private getAjaxMessage;
	@Getter('getAjaxStatus', { namespace: 'CreatePostStore' }) private getAjaxStatus;
	@Getter('getBody', { namespace: 'CreatePostStore' }) private stateBody;
	@Getter('getTitle', { namespace: 'CreatePostStore' }) private stateTitle;

	private body = '';
	private uiState: UIState = UIState.READY;
	private title = '';

	private beforeDestroy() {
		console.info('Saving form for later use...');
		this.setBody(this.body);
		this.setTitle(this.title);
	}

	private created() {
		console.info('Post form created');
		this.restoreValuesFromStore();
	}

	private focusOnElement(id: string) {
		const $element = document.getElementById(id);
		if ($element) ($element as HTMLElement).focus();
	}

	private mounted() {
		const $input = document.getElementById('input-title');
		if ($input) ($input as HTMLInputElement).focus();
	}

	private resetAjaxStatus() {
		this.setAjaxStatus(AjaxState.IDLE);
		this.setAjaxMessage('');
	}

	private resetForm() {
		console.info('Resetting post form...');
		this.body = '';
		this.title = '';
		this.resetAjaxStatus();
		this.setBody('');
		this.setTitle('');
		this.uiState = UIState.READY;
		this.focusOnElement('input-title');
	}

	private async submitForm() {
		console.info('Saving posts...');
		this.saveValuesToStore();
		this.uiState = UIState.LOADING;
		this.submitPost()
			.then((response) => {
				if (201 === response.status) {
					console.debug('Post saved ✅', response);
				}
				return response;
			})
			.catch((error) => {
				console.error('Something went wrong while saving new post:', error);
			});
	}

	private restoreValuesFromStore() {
		console.info('Restoring previous values from store...');
		this.body = this.stateBody;
		this.title = this.stateTitle;
	}

	private saveValuesToStore() {
		console.info('Saving values to store...');
		this.setBody(this.body);
		this.setTitle(this.title);
	}

	get disableInput(): boolean {
		return AjaxState.IDLE !== this.getAjaxStatus;
	}

	get disableSubmit(): boolean {
		const isDisabled =
			0 < this.getAjaxMessage.length || 0 === this.body.length || 0 === this.title.length;
		// console.debug( isDisabled ? 'Disabling send button' : 'Enabling send button' );
		return isDisabled;
	}

	get showStartOver(): boolean {
		const isVisible =
			0 === this.getAjaxMessage.length &&
			this.uiState === UIState.READY &&
			(0 < this.body.length || 0 < this.title.length);
		// console.debug( isVisible ? 'Showing reset button' : 'Hiding reset button' );
		return isVisible;
	}

	@Watch('getAjaxStatus', { immediate: false, deep: false })
	private onAjaxStatusChanged(newStatus: AjaxState): void {
		switch (newStatus) {
			case AjaxState.ERROR:
				console.info('Showing error message...');
				this.uiState = UIState.ERROR;
				this.$notify({
					group: 'ajax-error',
					title: 'Error',
					text: this.getAjaxMessage
				});
				setTimeout(() => {
					this.resetAjaxStatus();
					this.uiState = UIState.READY;
					// Focus back on send button in case the user wants to try again
					this.$nextTick(() => this.focusOnElement('submit-button'));
				}, this.notificationDuration);
				break;

			case AjaxState.SENDING:
				this.uiState = UIState.LOADING;
				break;

			case AjaxState.SUCCESS:
				this.$notify({
					group: 'ajax-success',
					title: 'Success',
					text: this.getAjaxMessage
				});
				setTimeout(() => {
					this.resetForm();
					this.uiState = UIState.READY;
				}, this.notificationDuration);
				break;
		}
	}
}
</script>

<style scoped lang="scss">
$border-color: #ccc;
$error-color: #e53237;
$reset-color: #ccc;
$submit-button-background: #47b784;
$submit-button-color: #fff;
$success-color: #47b784;
$text-input-background: WhiteSmoke;
$text-input-color: #333;

@keyframes animateButton {
	from {
		background: $submit-button-background;
	}
	to {
		background: darken($submit-button-background, 5%);
	}
}

button {
	border: 0;
}

button[type='reset'] {
	background: transparent;
	border: 0;
	color: $reset-color;
	font-size: 0.9em;
	margin: 0.25em auto;
	transition: color 0.3s ease-out;

	&:focus {
		color: #e53237;
	}
}

button[type='submit'] {
	background: $submit-button-background;
	color: $submit-button-color;
	font-size: 1.6em;
	margin-top: 0.5em;
	transition: background 0.1s linear;
	user-select: none;
	width: 6em;

	&[disabled] {
		background: #eee;
		color: #bbb;
		cursor: not-allowed;
	}

	&:focus {
		animation: animateButton 1.15s ease-in-out 0s infinite alternate both;
	}

	&:hover {
		background: tint($submit-button-background, 5%);
		animation: none;
	}
}

button[type='submit'],
label {
	letter-spacing: 0.15ch;
}

button[type='submit'],
input[type='text'],
textarea {
	padding: 1rem;
}

label {
	display: block;
	margin-bottom: 0.35em;
	text-transform: uppercase;
}

input[type='text'],
textarea {
	background: $text-input-background;
	border: 1px solid $border-color;
	color: $text-input-color;
	font-size: 1.2em;
	padding: 1rem;
	width: 100%;
}

textarea {
	font-family: inherit;
	height: 5em;
	resize: none;
}

.error {
	color: $error-color;
}

.form-wrapper {
	margin: 0 auto;
	max-width: 30em;
}

.form-title {
	border-bottom: 1px solid $border-color;
	margin: 0.5em;
	padding: 1em;
}

.notice {
	font-size: 0.9em;
}

.success {
	color: $success-color;
}
</style>
