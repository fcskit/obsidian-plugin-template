import { App, Modal } from 'obsidian';
import { createLogger } from '../utils/Logger';

export class ExampleModal extends Modal {
	private logger = createLogger('modal');

	constructor(app: App) {
		super(app);
		this.logger.debug('Example modal created');
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.addClass('example-modal');
		
		this.logger.debug('Opening modal');
		
		contentEl.createEl('h2', { text: 'Example Modal' });
		
		const content = contentEl.createDiv({ cls: 'example-modal-content' });
		content.createEl('p', { text: 'This is an example modal from the template.' });
		content.createEl('p', { text: 'You can customize this modal for your plugin needs.' });
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
		this.logger.debug('Modal closed');
	}
}
