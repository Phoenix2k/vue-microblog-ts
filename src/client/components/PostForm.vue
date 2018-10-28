<template lang="html">
	<div class="post-wrapper">
		<form name="post-form" @submit.prevent="submitForm">
			<h2 class="form-title">Write a post</h2>
			<p><label id="input-title" for="title">Title</label></p>
			<p></p><input aria-describedby="input-title" autocomplete="off" id="title" name="title" required type="text" v-model.trim="title" /></p>
			<p><label id="textarea-body" for="body">Body</label></p>
			<p><textarea aria-describedby="textarea-body" autocomplete="off" id="body" name="body" required v-model.trim="body"></textarea></p>
			<p><button id="submit-post" type="submit" :disabled="disableSubmit">Save</button></p>
			<transition name="zoom" mode="out-in">
				<p v-if="showStartOver"><button type="reset" @click="resetForm">Start over</button></p>
			</transition>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import SubmitPostConstructor from '../constructors/SubmitPostConstructor';
import { AjaxState, UIState } from '../types';

@Component
export default class PostForm extends Vue {

	@Action( 'setAjaxMessage', { namespace: 'PostFormStore' } ) private setAjaxMessage;
	@Action( 'setAjaxStatus',  { namespace: 'PostFormStore' } ) private setAjaxStatus;
	@Action( 'setBody',        { namespace: 'PostFormStore' } ) private setBody;
	@Action( 'setTitle',       { namespace: 'PostFormStore' } ) private setTitle;
	@Action( 'submitPost',     { namespace: 'PostFormStore' } ) private submitPost;

	@Getter( 'getNotificationDuration' ) private notificationDuration;

	@Getter( 'getAjaxMessage', { namespace: 'PostFormStore' } ) private getAjaxMessage;
	@Getter( 'getAjaxStatus',  { namespace: 'PostFormStore' } ) private getAjaxStatus;
	@Getter( 'getBody',        { namespace: 'PostFormStore' } ) private stateBody;
	@Getter( 'getTitle',       { namespace: 'PostFormStore' } ) private stateTitle;

	private body: string = '';
	private uiState: UIState = UIState.READY;
	private title: string = '';

	private beforeDestroy() {
		console.log( 'Preparing to destroy post form...' );
		this.setAjaxStatus( AjaxState.IDLE );
		this.setBody( this.body );
		this.setTitle( this.title );
	}

	private created() {
		console.log( 'Post form created' );
		this.restoreValuesFromStore();
	}

	private mounted() {
		const $input = document.getElementById( 'input-title' )!;
		if ( $input ) $input.focus();
	}

	private resetForm() {
		console.log( 'Resetting post form...' );
		this.body = '';
		this.title = '';
		this.setAjaxMessage( '' );
		this.setAjaxStatus( AjaxState.IDLE );
		this.setBody( '' );
		this.setTitle( '' );
		this.uiState = UIState.READY;
		document.getElementById( 'title' )!.focus();
	}

	private async submitForm() {
		console.info( 'Saving posts...' );
		this.saveValuesToStore();
		this.uiState = UIState.LOADING;
		this.submitPost().then( response => {
			if ( 201 === response.status ) {
				console.debug( 'Post saved ✅', response );
			}
			return response;
		} ).catch( error => {
			console.error( 'Something went wrong while saving new post:', error );
		} );
	}

	private restoreValuesFromStore() {
		console.log( 'Restoring previous values from store...' );
		this.body = this.stateBody;
		this.title = this.stateTitle;
	}

	private saveValuesToStore() {
		console.log( 'Saving values to store...' );
		this.setBody( this.body );
		this.setTitle( this.title );
	}

	get disableSubmit(): boolean {
		const isDisabled = 0 < this.getAjaxMessage.length || 0 === this.body.length || 0 === this.title.length;
		// console.log( isDisabled ? 'Disabling send button' : 'Enabling send button' );
		return isDisabled;
	}

	get showStartOver(): boolean {
		const isVisible = 0 === this.getAjaxMessage.length && this.uiState === UIState.READY && ( 0 < this.body.length || 0 < this.title.length );
		// console.log( isVisible ? 'Showing reset button' : 'Hiding reset button' );
		return isVisible;
	}

	@Watch( 'getAjaxStatus', { immediate: false, deep: false } )
	private onAjaxStatusChanged( newStatus: AjaxState, oldStatus: AjaxState ): void {
		switch ( newStatus ) {
			case AjaxState.ERROR:
				console.log( 'Showing error message...' );
				this.uiState = UIState.ERROR;
				this.$notify( {
					group: 'ajax-error',
					title: 'Error',
					text : this.getAjaxMessage,
				} );
				setTimeout( () => {
					this.setAjaxStatus( AjaxState.IDLE );
					this.setAjaxMessage( '' );
					this.uiState = UIState.READY;
					this.$nextTick( () => document.getElementById( 'submit-post' )!.focus() );
				}, this.notificationDuration );
				break;
			case AjaxState.SENDING:
				this.uiState = UIState.LOADING;
				break;
			case AjaxState.SUCCESS:
				this.$notify( {
					group: 'ajax-success',
					title: 'Success',
					text : this.getAjaxMessage,
				} );
				this.uiState = UIState.READY;
				setTimeout( () => {
					this.resetForm();
				}, this.notificationDuration );
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
		background: darken( $submit-button-background, 5% );
	}
}

button {
	border: 0;
}

button[type=reset] {
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

button[type=submit] {
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
		background: tint( $submit-button-background, 5% );
		animation: none;
	}
}

button[type=submit],
label {
	letter-spacing: 0.15ch;
}

button[type=submit],
input[type=text],
textarea {
	padding: 1rem;
}

label {
	display: block;
	margin-bottom: 0.35em;
	text-transform: uppercase;
}

input[type=text],
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

.form-title {
	border-bottom: 1px solid $border-color;
	margin: 0.5em;
	padding: 1em;
}

.notice {
	font-size: 0.9em;
}

.post-wrapper {
	margin: 0 auto;
	max-width: 30em;
}

.success {
	color: $success-color;
}
</style>
