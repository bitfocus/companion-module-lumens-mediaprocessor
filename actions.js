var index

var AudioVolumeOptions = []
var VideoSourceIDOptions = []
var LayoutOptions = []
var BackgroundOptions = []
var OverlaySceneOptions = []
var PresetOptions = []
var MoveSpeedOptions = []
var ZoomSpeedOptions = []

var ChannelOptions = [
	{ id: '31', label: 'Channel 1' },
	{ id: '32', label: 'Channel 2' },
	{ id: '33', label: 'Channel 3' },
	{ id: '34', label: 'Channel 4' },
]

var AudioOutputOptions = [
	{ id: '31', label: 'Line & HDMI output' },
	{ id: '32', label: 'PGM output' },
]

var AudioMuteOptions = [
	{ id: '30', label: 'Audio Unmute' },
	{ id: '31', label: 'Audio Mute' },
]

var AudioInputTypeOptions = [
	{ id: '31', label: 'Line In' },
	{ id: '32', label: 'Mic In' },
	{ id: '33', label: 'HDMI In' },
	{ id: '36', label: 'IP Audio In' },
]

var AudioOutputTypeOptions = [
	{ id: '31', label: 'ALL' },
	{ id: '32', label: 'Line out + PGM' },
	{ id: '33', label: 'MultiView' },
]

var MacroOptions = [
	{ id: '31', label: 'Macro 1' },
	{ id: '32', label: 'Macro 2' },
	{ id: '33', label: 'Macro 3' },
]

var StreamOptions = [
	{ id: '31', label: 'Stream 1' },
	{ id: '32', label: 'Stream 2' },
	{ id: '33', label: 'Stream 3' },
]

var StreamStartStopOptions = [
	{ id: '1', label: 'Stop Stream' },
	{ id: '2', label: 'Start Stream' },
]

var CameraMoveOptions = [
	{ id: '53', label: 'Stop' },
	{ id: '55', label: 'Up' },
	{ id: '44', label: 'Down' },
	{ id: '4C', label: 'Left' },
	{ id: '52', label: 'Right' },
]

var ZoomMoveOptions = [
	{ id: '53', label: 'Stop' },
	{ id: '49', label: 'Zoom In' },
	{ id: '4F', label: 'Zoom Out' },
]

// create Options
for (index = 0; index <= 125; index++) {
	AudioVolumeOptions.push({ id: index.toString(16), label: 'Volume ' + parseInt(index) })
}

for (index = 1; index <= 255; index++) {
	VideoSourceIDOptions.push({ id: index.toString(16), label: 'Source ' + parseInt(index) })
}

for (index = 1; index <= 18; index++) {
	LayoutOptions.push({ id: index.toString(16), label: 'Layout ' + parseInt(index) })
}

for (index = 0; index <= 9; index++) {
	BackgroundOptions.push({ id: index.toString(16), label: 'Background ' + parseInt(index) })
}

for (index = 0; index <= 30; index++) {
	OverlaySceneOptions.push({ id: index.toString(16), label: 'ID ' + parseInt(index) })
}

for (index = 1; index <= 9; index++) {
	PresetOptions.push({ id: index.toString(16), label: 'Preset ' + parseInt(index) })
}

for (index = 1; index <= 24; index++) {
	if (index === 1) {
		MoveSpeedOptions.push({ id: '1', label: 'Speed 1 (low speed)' })
	} else if (index === 24) {
		MoveSpeedOptions.push({ id: '18', label: 'Speed 24 (high speed)' })
	} else {
		MoveSpeedOptions.push({ id: index.toString(16), label: 'Speed ' + parseInt(index) })
	}
}

for (index = 1; index <= 7; index++) {
	if (index === 1) {
		ZoomSpeedOptions.push({ id: '1', label: 'Speed 1 (low speed)' })
	} else if (index === 7) {
		ZoomSpeedOptions.push({ id: '7', label: 'Speed 7 (high speed)' })
	} else {
		ZoomSpeedOptions.push({ id: index.toString(16), label: 'Speed ' + parseInt(index) })
	}
}

var actions = {
	//=============== System catalog =================
	PowerOff: { label: 'Power Off' },

	PowerMode: {
		label: 'Power Mode',
		options: [
			{
				type: 'dropdown',
				label: 'Standby/Wake Up',
				id: 'val',
				choices: [
					{ id: '31', label: 'Standby' },
					{ id: '32', label: 'Wake Up' },
				],
			},
		],
	},

	BackuptoUSB: {
		label: 'Backup to USB',
		options: [
			{
				type: 'dropdown',
				label: 'Start / Stop',
				id: 'val',
				choices: [
					{ id: '31', label: 'Stop' },
					{ id: '30', label: 'Start' },
				],
			},
		],
	},

	//=============== Video/Audio catalog =================
	StartRecord: { label: 'Start Record' },

	StopRecord: { label: 'Stop Record' },

	AudioVolumeInput: {
		label: 'Audio Volume Input',
		options: [
			{
				type: 'dropdown',
				label: 'Audio Input Channel',
				id: 'val',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Audio Volume',
				id: 'val2',
				choices: AudioVolumeOptions,
			},
		],
	},

	AudioVolumeOutput: {
		label: 'Audio Volume Output',
		options: [
			{
				type: 'dropdown',
				label: 'Audio Output Channel',
				id: 'val',
				choices: AudioOutputOptions,
			},
			{
				type: 'dropdown',
				label: 'Audio Volume',
				id: 'val2',
				choices: AudioVolumeOptions,
			},
		],
	},

	AudioMuteInput: {
		label: 'Audio Mute Input',
		options: [
			{
				type: 'dropdown',
				label: 'Audio Input Channel',
				id: 'val',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Audio Mute',
				id: 'val2',
				choices: AudioMuteOptions,
			},
		],
	},

	AudioMuteOutput: {
		label: 'Audio Mute Output',
		options: [
			{
				type: 'dropdown',
				label: 'Audio Output Channel',
				id: 'val',
				choices: AudioOutputOptions,
			},
			{
				type: 'dropdown',
				label: 'Audio Mute',
				id: 'val2',
				choices: AudioMuteOptions,
			},
		],
	},

	AudioTypeInput: {
		label: 'Audio Type Input',
		options: [
			{
				type: 'dropdown',
				label: 'Audio Input Channel',
				id: 'val',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Audio Type',
				id: 'val2',
				choices: AudioInputTypeOptions,
			},
		],
	},

	AudioTypeOutput: {
		label: 'Audio Type Output',
		options: [
			{
				type: 'dropdown',
				label: 'Audio Output Channel',
				id: 'val',
				choices: AudioOutputOptions,
			},
			{
				type: 'dropdown',
				label: 'Audio Type',
				id: 'val2',
				choices: AudioOutputTypeOptions,
			},
		],
	},

	VideoSourceID: {
		label: 'Video Source ID',
		options: [
			{
				type: 'dropdown',
				label: 'Video Input Channel',
				id: 'val',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Video source ID',
				id: 'val2',
				choices: VideoSourceIDOptions,
			},
		],
	},

	//=============== Image catalog =================
	Snapshot: { label: 'Snapshot' },

	Layout: {
		label: 'Layout',
		options: [
			{
				type: 'dropdown',
				label: 'Layout',
				id: 'val',
				choices: LayoutOptions,
			},
		],
	},

	Background: {
		label: 'Background',
		options: [
			{
				type: 'dropdown',
				label: 'Background ID(0x00 : off)',
				id: 'val',
				choices: BackgroundOptions,
			},
		],
	},

	Overlay: {
		label: 'Overlay',
		options: [
			{
				type: 'dropdown',
				label: 'Overlay ID (0x00 : off)',
				id: 'val',
				choices: BackgroundOptions,
			},
		],
	},

	Overlay: {
		label: 'Overlay',
		options: [
			{
				type: 'dropdown',
				label: 'Overlay ID (0x00 : off)',
				id: 'val',
				choices: OverlaySceneOptions,
			},
		],
	},

	Scene: {
		label: 'Scene',
		options: [
			{
				type: 'dropdown',
				label: 'Scene ID',
				id: 'val',
				choices: OverlaySceneOptions,
			},
		],
	},

	Macro: {
		label: 'Macro',
		options: [
			{
				type: 'dropdown',
				label: 'Macro ID',
				id: 'val',
				choices: MacroOptions,
			},
		],
	},

	//=============== Newwork catalog =================
	Stream: {
		label: 'Stream Control',
		options: [
			{
				type: 'dropdown',
				label: 'Stream ID',
				id: 'val',
				choices: StreamOptions,
			},
			{
				type: 'dropdown',
				label: 'Stream Action',
				id: 'val2',
				choices: StreamStartStopOptions,
			},
		],
	},

	//=============== Camera catalog =================
	CameraPresetRecall: {
		label: 'Camera Preset Recall',
		options: [
			{
				type: 'dropdown',
				label: 'Camera Channel',
				id: 'val',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Camera Preset ID',
				id: 'val2',
				choices: PresetOptions,
			},
		],
	},

	CameraSavePreset: {
		label: 'Camera Save Preset',
		options: [
			{
				type: 'dropdown',
				label: 'Camera Channel',
				id: 'val',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Camera Preset ID',
				id: 'val2',
				choices: PresetOptions,
			},
		],
	},

	CameraMove: {
		label: 'Camera Move',
		options: [
			{
				type: 'dropdown',
				label: 'Camera Moving Actions',
				id: 'val',
				choices: CameraMoveOptions,
			},
			{
				type: 'dropdown',
				label: 'Camera Channel',
				id: 'val2',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Camera Move Speed',
				id: 'val3',
				choices: MoveSpeedOptions,
			},
		],
	},

	CameraZoom: {
		label: 'Camera Zoom',
		options: [
			{
				type: 'dropdown',
				label: 'Camera Zoom Actions',
				id: 'val',
				choices: ZoomMoveOptions,
			},
			{
				type: 'dropdown',
				label: 'Camera Channel',
				id: 'val2',
				choices: ChannelOptions,
			},
			{
				type: 'dropdown',
				label: 'Camera Zoom Speed',
				id: 'val3',
				choices: ZoomSpeedOptions,
			},
		],
	},
}

//==================== System :==============
module.exports = actions
