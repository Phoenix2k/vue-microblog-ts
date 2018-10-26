<template lang="html">
	<div class="post-wrapper">
		<div id="aria-error" class="error notice" v-if="error">
			<p>Unable to save the post. Try again?</p>
		</div>
		<div id="aria-success" class="success notice" v-if="success">
			<p>Post saved sucecssfully.</p>
		</div>
		<transition name="fade" mode="in">
			<form name="post-form" @submit.prevent="submitForm">
				<p>
					<label id="aria-input-title" for="title">Title</label>
					<input aria-describedby="aria-input-title" autocomplete="off" id="title" name="title" required type="text" v-model.trim="title" />
				</p>
				<p>
					<label id="aria-textarea-body" for="body">Body</label>
					<textarea aria-describedby="aria-textarea-body" autocomplete="off" id="body" name="body" required v-model.trim="body"></textarea>
				</p>
				<p><button :aria-describedby="ariaSubmitStatus" id="aria-submit" type="submit" :disabled="notEnoughContent || isLoading">Save</button></p>
				<p><button type="reset" @click="resetForm" v-if="! isLoading">Start over</button></p>
				<p><small id="aria-saving" v-if="isLoading">Saving...</small></p>
			</form>
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, namespace } from 'vuex-class';
import SubmitPostConstructor from '../constructors/SubmitPostConstructor';

@Component( { } )
export default class PostForm extends Vue {

	@Action( 'setBody', { namespace: 'PostFormStore' } ) private setBody;
	@Action( 'setError', { namespace: 'PostFormStore' } ) private setError;
	@Action( 'setLoading', { namespace: 'PostFormStore' } ) private setLoading;
	@Action( 'setSuccess', { namespace: 'PostFormStore' } ) private setSuccess;
	@Action( 'setTitle', { namespace: 'PostFormStore' } ) private setTitle;
	@Action( 'submitPost', { namespace: 'PostFormStore' } ) private submitPost;

	@Getter( 'getBody', { namespace: 'PostFormStore' } ) private stateBody;
	@Getter( 'getError', { namespace: 'PostFormStore' } ) private error;
	@Getter( 'getLoading', { namespace: 'PostFormStore' } ) private isLoading;
	@Getter( 'getSuccess', { namespace: 'PostFormStore' } ) private success;
	@Getter( 'getTitle', { namespace: 'PostFormStore' } ) private stateTitle;

	private body: string = '';
	private title: string = '';

	private beforeDestroy() {
		this.resetStatus();
		this.setBody( this.body );
		this.setTitle( this.title );
	}

	private created() {
		this.restoreValuesFromStore();
	}

	private resetForm() {
		this.body = '';
		this.title = '';
		this.resetStatus();
		this.setBody( '' );
		this.setTitle( '' );
		document.getElementById( 'title' )!.focus();
	}

	private resetStatus() {
		this.setError( false );
		this.setLoading( false );
		this.setSuccess( false );
	}

	private async submitForm() {
		console.info( 'Saving posts...' );
		this.saveValuesToStore();
		this.submitPost().then( response => {
			if ( 201 === response.status ) {
				console.debug( 'Post saved ✅', response );
				this.setSuccess( true );
				setTimeout( () => {
					this.resetForm();
				}, 2000 );
				return response;
			}
			console.warn( 'Received an unexpected response', response );
			this.setError( true );
		} ).catch( error => {
			this.setError( true );
			console.error( error );
		} );
	}

	private restoreValuesFromStore() {
		this.body = this.stateBody;
		this.title = this.stateTitle;
	}

	private saveValuesToStore() {
		this.setBody( this.body );
		this.setTitle( this.title );
	}

	get ariaSubmitStatus(): string {
		let ariaElementIdName = '';
		if ( this.error ) ariaElementIdName = 'aria-error';
		else if ( this.isLoading ) ariaElementIdName = 'aria-loading';
		else if ( this.success ) ariaElementIdName = 'aria-success';
		return ariaElementIdName;
	}

	get notEnoughContent(): boolean {
		return 0 === this.title.length || 0 === this.body.length;
	}

	// Refocus on submit button if something went wrong
	@Watch( 'getError', { immediate: false, deep: false } )
	private onPostsChanged( error: boolean ): void {
		if ( error ) {
			const $submit = document.getElementById( 'aria-submit' )!;
			if ( document.activeElement === $submit ) {
				$submit.blur();
				this.$nextTick( () => $submit.focus() );
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import url( '../scss/animations.scss' );

$error-background: #e53237;
$error-color: #fff;
$submit-button-background: #47b784;
$submit-button-color: #fff;
$success-background: #47b784;
$success-color: #fff;
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

button[type="reset"] {
	background: transparent;
	border: 0;
	color: #bbb;
	font-size: 0.9em;
	margin: 0.25em auto;
	transition: color 0.3s ease-out;

	&:focus {
		color: #e53237;
	}
}

button[type="submit"] {
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
		animation: animateButton 1.25s ease-in-out 0s infinite alternate both;
	}

	&:hover {
		background: tint( $submit-button-background, 5% );
		animation: none;
	}
}

button[type="submit"],
input[type="text"],
textarea {
	padding: 1rem;
}

button[type="submit"],
label {
	letter-spacing: 0.15ch;
}

label {
	display: block;
	margin-bottom: 0.35em;
	text-transform: uppercase;
}

input[type="text"],
textarea {
	background: $text-input-background;
	border: 1px solid #ddd;
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

.notice {
	font-size: 0.9em;
	padding: 0.5em;
}

.post-wrapper {
	margin: 0 auto;
	max-width: 30em;
}

.success {
	background: $success-background;
	color: $success-color;
}
</style>
