import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { createLogger, logger } from './utils/Logger';
import { ExampleModal } from './ui/ExampleModal';

// Build-time constant - will be replaced by esbuild
declare const BUILD_ENV: string;

interface ExamplePluginSettings {
	exampleSetting: string;
}

const DEFAULT_SETTINGS: ExamplePluginSettings = {
	exampleSetting: 'default'
}

export default class ExamplePlugin extends Plugin {
	settings: ExamplePluginSettings;
	private pluginLogger = createLogger('main');

	async onload() {
		this.pluginLogger.info('Loading plugin...');
		
		// Initialize file logging (optional)
		logger.initFileLogging(this.app);
		
		// Enable debug logging in development mode (removed in production builds)
		if (typeof BUILD_ENV !== 'undefined' && BUILD_ENV === 'development') {
			logger.setComponentLevel('main', 'debug');
			logger.setComponentLevel('modal', 'debug');
			logger.setComponentLevel('ui', 'debug');
			logger.setComponentLevel('settings', 'debug');
			logger.setComponentLevel('api', 'debug');
			logger.setComponentLevel('events', 'debug');
			logger.setComponentLevel('general', 'debug');
			this.pluginLogger.debug('Debug logging enabled for all components');
		}
		
		await this.loadSettings();

		// Add ribbon icon
		this.addRibbonIcon('dice', 'Example Plugin', (evt: MouseEvent) => {
			// DEBUG_START
			this.pluginLogger.debug('Ribbon icon clicked', {
				button: evt.button,
				timestamp: Date.now()
			}, ['user-interaction']);
			// DEBUG_END
			new ExampleModal(this.app).open();
		});

		// Add command
		this.addCommand({
			id: 'open-example-modal',
			name: 'Open Example Modal',
			callback: () => {
				// DEBUG_START
				this.pluginLogger.debug('Command executed via palette', undefined, ['user-interaction']);
				// DEBUG_END
				new ExampleModal(this.app).open();
			}
		});

		// Add settings tab
		this.addSettingTab(new ExampleSettingTab(this.app, this));
		
		this.pluginLogger.info('Plugin loaded successfully');
	}

	onunload() {
		this.pluginLogger.info('Unloading plugin...');
		logger.disableFileLogging();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ExampleSettingTab extends PluginSettingTab {
	plugin: ExamplePlugin;
	private logger = createLogger('settings');

	constructor(app: App, plugin: ExamplePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.logger.debug('Displaying settings tab');

		new Setting(containerEl)
			.setName('Example Setting')
			.setDesc('This is an example setting')
			.addText(text => text
				.setPlaceholder('Enter your setting')
				.setValue(this.plugin.settings.exampleSetting)
				.onChange(async (value) => {
					this.logger.debug('Setting changed', { value });
					this.plugin.settings.exampleSetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
