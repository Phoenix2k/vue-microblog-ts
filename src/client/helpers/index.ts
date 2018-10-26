import { AjaxState } from '../types';

export const AjaxStateToString = ( ajaxState: AjaxState ): string => {
	let text = '';
	switch ( ajaxState ) {
		case AjaxState.ERROR:   text = 'ERROR';   break;
		case AjaxState.IDLE:    text = 'IDLE';    break;
		case AjaxState.LOADING: text = 'LOADING'; break;
		case AjaxState.SENDING: text = 'SENDING'; break;
		case AjaxState.SUCCESS: text = 'SUCCESS'; break;
	}
	return text;
};
