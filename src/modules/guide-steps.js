import getOptions from '../helpers/options';

let currentStep = 1;

const smallScreenWidth = 640;

export function nextStep() {
	currentStep++;
}

export function isLastStep() {
	return currentStep >= steps.length;
}

function getTotalSteps() {
	return getOptions().steps.length;
}

function getStepData( step ) {
	return getOptions().steps[ step - 1 ];
}

function getCurrentStepData() {
	return getStepData( currentStep );
}

function getCurrentStep() {
	return currentStep;
}

export function getHtml() {
	return `<div id="dmguide-overlay"><div id="dmguide">
	<div class="dmguide-step">${getStepHtml()}</div>
	</div></div>`;
}

export function getStepHtml() {
	let stepData = getCurrentStepData();
	let html = '<div id="dmguide-text">';


	if ( stepData.title ) {
		html += `<h2 id="dmguide-header">${stepData.title}</h2>`;
	}

	if ( stepData.content ) {
		html += stepData.content;
	}

	if ( stepData.smallContent && matchMedia && matchMedia( `screen and (max-width:${smallScreenWidth}px)` ).matches ) {
		html += ' ' + stepData.smallContent;
	}

	html += getButtons();

	html += '</div>';

	return html;
}

function getButtons() {
	let html = '<div class="dmguide-button-wrap">';

	if ( getCurrentStep() >= 1 && getCurrentStep() < getTotalSteps() ) {
		html += `<button class="dmguide-button dmguide-next dmguide-button-primary">${getCurrentStepData().button}</button>`;
	}
	if ( getCurrentStep() === getTotalSteps() ) {
		html += `<button class="dmguide-button dmguide-button-primary">${getCurrentStepData().button}</button>`;
	}

	html += '</div>';
	return html;
}