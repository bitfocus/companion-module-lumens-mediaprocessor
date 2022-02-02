var tcp = require('../../tcp')
var instance_skel = require('../../instance_skel')
var presets = require('./presets.js')
var actions = require('./actions.js')

var debug
var log

function instance(system, id, config) {
	var self = this

	// super-constructor
	instance_skel.apply(this, arguments)

	self.actions() // export actions
	self.init_presets()

	return self
}

instance.prototype.updateConfig = function (config) {
	var self = this
	self.init_presets()

	if (self.socket !== undefined) {
		self.socket.destroy()
		delete self.socket
	}

	self.config = config

	self.init_tcp()
}

instance.prototype.init = function () {
	var self = this

	debug = self.debug
	log = self.log
	self.init_presets()
	self.init_tcp()
}

instance.prototype.init_tcp = function () {
	var self = this

	if (self.socket !== undefined) {
		self.socket.destroy()
		delete self.socket
		console.log('socket destroy!\n')
	}

	self.status(self.STATE_WARNING, 'Connecting')
	console.log('socket Connecting!\n')

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port)

		self.socket.on('status_change', function (status, message) {
			self.status(status, message)
			console.log(message)
			console.log('\n')
		})

		self.socket.on('error', function (err) {
			debug('Network error', err)
			self.status(self.STATE_ERROR, err)
			self.log('error', 'Network error: ' + err.message)
			console.log('error', 'Network error: ' + err.message)
		})

		self.socket.on('connect', function () {
			self.status(self.STATE_OK)
			debug('Connected')
			console.log('Connected')
		})

		self.socket.on('data', function (data) {})
	}
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this

	return [
		{
			type: 'text',
			id: 'info',
			label: 'Information',
			width: 12,
			value: `
				<div class="alert alert-danger">
					<h3>Lumens : 「We Make Your Job Easier」 !</h3>
						This module controls LUMENS media processor with TCP over IP protocol.
						<br>
						For more details about Lumens media processor, please refer to... 
						<br>
						<a href="https://www.mylumens.com/en/Products/3/Media-Processor" target="_new" class="btn btn-warning mr-1">Media Processor info.</a>					
					<br><br><br>
					<h4>Please fill in the IP below</h4>
				</div>
			`,
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP (for example : 192.168.4.54)',
			width: 6,
			regex: self.REGEX_IP,
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port (default : 5080)',
			width: 6,
			default: 5080,
			regex: self.REGEX_PORT,
		},
	]
}

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this

	if (self.socket !== undefined) {
		self.socket.destroy()
	}

	debug('destroy', self.id)
}

instance.prototype.init_presets = function () {
	var self = this

	self.setPresetDefinitions(presets)
}

instance.prototype.actions = function (system) {
	var self = this

	self.setActions(actions)
}

instance.prototype.action = function (action) {
	var self = this
	var opt = action.options
	var cmd = ''
	var cmdLength
	var buf = new Buffer(32)

	switch (action.action) {
		case 'PowerOff':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x50\x57\x30\x0D'
			break

		case 'PowerMode':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x53\x52' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'BackuptoUSB':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x42\x55' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'StartRecord':
			cmdLength = 8
			cmd = '\x55\xF0\x04\x01\x73\x52\x43\x0D'
			break

		case 'StopRecord':
			cmdLength = 8
			cmd = '\x55\xF0\x04\x01\x73\x53\x50\x0D'
			break

		case 'AudioVolumeInput':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x41\x56\x49' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'AudioVolumeOutput':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x41\x56\x4F' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'AudioMuteInput':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x41\x4D\x49' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'AudioMuteOutput':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x41\x4D\x4F' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'AudioTypeInput':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x41\x54\x49' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'AudioTypeOutput':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x41\x54\x4F' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'VideoSourceID':
			cmdLength = 10
			cmd =
				'\x55\xF0\x06\x01\x73\x43\x48' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'Snapshot':
			cmdLength = 8
			cmd = '\x55\xF0\x04\x01\x73\x53\x53\x0D'
			break

		case 'Layout':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x4C\x4F' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'Background':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x42\x47' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'Overlay':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x4F\x4C' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'Scene':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x54\x45' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'Macro':
			cmdLength = 9
			cmd = '\x55\xF0\x05\x01\x73\x4D\x43' + String.fromCharCode(parseInt(opt.val, 16) & 0xff) + '\x0D'
			break

		case 'Stream':
			cmdLength = 10
			cmd =
				'\x55\xF0\x06\x01\x73\x53\x43' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'CameraPresetRecall':
			cmdLength = 10
			cmd =
				'\x55\xF0\x06\x01\x73\x43\x50' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'CameraSavePreset':
			cmdLength = 10
			cmd =
				'\x55\xF0\x06\x01\x73\x43\x53' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				'\x0D'
			break

		case 'CameraMove':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x43\x4D' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val3, 16) & 0xff) +
				'\x0D'
			break

		case 'CameraZoom':
			cmdLength = 11
			cmd =
				'\x55\xF0\x07\x01\x73\x43\x5A' +
				String.fromCharCode(parseInt(opt.val, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val2, 16) & 0xff) +
				String.fromCharCode(parseInt(opt.val3, 16) & 0xff) +
				'\x0D'
			break
	}

	buf.write(cmd, 0, 'binary')

	var newbuf = buf.slice(0, cmdLength)

	if (cmd !== undefined) {
		try {
			debug('sending ', cmd, 'to', self.config.host)

			if (self.socket !== undefined && self.socket.connected) {
				self.socket.send(buf)
				console.log('\x1b[36m', ("====> To '" + self.config.label + "': ").padStart(25, ' '), newbuf, '\x1b[0m') //shown in cyan, "to", self.config.host);
			} else {
				debug('Socket not connected :(')
				console.log('\x1b[31m', 'Socket not connected :(', '\x1b[0m') //shown in red
			}
		} catch (error) {
			console.log('\x1b[31m', 'Error : when sending TCP command to ', self.config.label, '\x1b[0m') //shown in red
			console.log(error)
		}
	}
}

instance_skel.extendedBy(instance)
exports = module.exports = instance
