<template lang="html">
	<div class="post-wrapper">
		<form name="post-form" @submit.prevent="submitForm">
			<h2 class="form-title">Write a post</h2>
			<p><label id="aria-input-title" for="title">Title</label></p>
			<p></p><input aria-describedby="aria-input-title" autocomplete="off" id="title" name="title" required type="text" v-model.trim="title" /></p>
			<p><label id="aria-textarea-body" for="body">Body</label></p>
			<p><textarea aria-describedby="aria-textarea-body" autocomplete="off" id="body" name="body" required v-model.trim="body"></textarea></p>
			<p><button :aria-describedby="ajaxStatusId" id="aria-submit" type="submit" :disabled="disableSubmit">Save</button></p>
			<transition name="pulse" mode="out-in">
				<p v-if="showStartOver"><button type="reset" @click="resetForm">Start over</button></p>
				<p id="aria-submit-status" class="notice" :class="ajaxStatusClasses" :key="getAjaxState" v-if="ajaxStatusText">{{ ajaxStatusText }}</p>
			</transition>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import SubmitPostConstructor from '../constructors/SubmitPostConstructor';
import { AjaxState } from '../types';

@Component( { } )
export default class PostForm extends Vue {

	@Action( 'setAjaxState', { namespace: 'PostFormStore' } ) private setAjaxState;
	@Action( 'setBody',      { namespace: 'PostFormStore' } ) private setBody;
	@Action( 'setTitle',     { namespace: 'PostFormStore' } ) private setTitle;
	@Action( 'submitPost',   { namespace: 'PostFormStore' } ) private submitPost;

	@Getter( 'getAjaxState', { namespace: 'PostFormStore' } ) private getAjaxState;
	@Getter( 'getBody',      { namespace: 'PostFormStore' } ) private stateBody;
	@Getter( 'getTitle',     { namespace: 'PostFormStore' } ) private stateTitle;

	private body: string = '';
	private title: string = '';

	private beforeDestroy() {
		console.log( 'Preparing to destroy post form...' );
		this.setAjaxState( AjaxState.IDLE );
		this.setBody( this.body );
		this.setTitle( this.title );
	}

	private created() {
		console.log( 'Post form created' );
		this.restoreValuesFromStore();
	}

	private resetForm() {
		console.log( 'Resetting post form...' );
		this.body = '';
		this.title = '';
		this.setBody( '' );
		this.setTitle( '' );

		// Add sligh delay for other animations to complete
		this.setAjaxState( AjaxState.IDLE );
		document.getElementById( 'title' )!.focus();
	}

	private async submitForm() {
		console.info( 'Saving posts...' );
		this.saveValuesToStore();
		this.setAjaxState( AjaxState.SENDING );
		this.submitPost().then( response => {
			if ( 201 === response.status ) {
				console.debug( 'Post saved ✅', response );
				this.setAjaxState( AjaxState.SUCCESS );
				setTimeout( () => { this.resetForm(); }, 2500 );
				return response;
			}
			console.warn( 'Received an unexpected response while saving new post', response );
			this.setAjaxState( AjaxState.ERROR );
		} ).catch( error => {
			this.setAjaxState( AjaxState.ERROR );
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

	get ajaxStatusClasses(): string {
		let classes = '';
		switch ( this.getAjaxState ) {
			case AjaxState.ERROR: classes = 'error'; break;
			case AjaxState.LOADING: classes = 'loading'; break;
			case AjaxState.SUCCESS: classes = 'success'; break;
		}
		console.log( 'Changing ajax status class(es) to:', classes );
		return classes;
	}

	get ajaxStatusText(): string {
		let statusText = '';
		switch ( this.getAjaxState ) {
			case AjaxState.ERROR:
				statusText = 'Unable to save post. Try again?';
				break;
			case AjaxState.SENDING:
				statusText = 'Saving post...';
				break;
			case AjaxState.SUCCESS:
				statusText = 'Post saved!';
				break;
		}
		if ( statusText ) console.log( 'Setting ajax status text to:', statusText );
		return statusText;
	}

	get ajaxStatusId(): string {
		return this.ajaxStatusText ? 'aria-submit-status' : '';
	}

	get disableSubmit(): boolean {
		const isDisabled = 0 < this.ajaxStatusText.length || 0 === this.body.length || 0 === this.title.length;
		// console.log( isDisabled ? 'Disabling send button' : 'Enabling send button' );
		return isDisabled;
	}

	get showStartOver(): boolean {
		const isVisible = this.getAjaxState === AjaxState.IDLE && ( 0 < this.body.length || 0 < this.title.length );
		// console.log( isVisible ? 'Showing reset button' : 'Hiding reset button' );
		return isVisible;
	}
}
</script>

<style scoped lang="scss">
@import url( '../scss/animations.scss' );

$border-color: #ccc;
$error-background: #e53237;
$error-color: #fff;
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
input[type=text],
textarea {
	padding: 1rem;
}

button[type=submit],
label {
	letter-spacing: 0.15ch;
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
	background: $error-background;
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
