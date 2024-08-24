 
fx_version 'cerulean' 
lua54 'yes' 
games { 'rdr3', 'gta5' } 
author 'DirkScripts' 
description 'Stops certain screen resolutions from being used' 
version '1.0.0' 

client_script { 
  'settings/config.lua',
  'src/client/ui.lua', 
  'src/client/screen_res.lua',
} 
 
ui_page 'web/build/index.html'

files {
	'web/build/index.html',
	'web/build/**/*',
}