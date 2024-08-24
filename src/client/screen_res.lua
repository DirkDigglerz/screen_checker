
local calculate_aspect_ratio = function(x,y)
  return x/y
end

local check_aspect_ratio_allowed = function(aspect_ratio)
  for i = 1, #Config.BannedAspectRatios do
    if Config.BannedAspectRatios[i] == aspect_ratio then
      return false
    end
  end
  return true
end

local check_screen_settings = function()
  local x,y = GetActiveScreenResolution()
  local aspect_ratio = calculate_aspect_ratio(x,y)
  return check_aspect_ratio_allowed(aspect_ratio)
end

local warning_open = false
local setWarning = function(data)
  if warning_open then return end
  warning_open = true
  SendNUIMessage({
    type = 'NEW_WARNING',
    data = data
  })
end 

local closeWarning = function()
  if not warning_open then return end
  warning_open = false
  SendNUIMessage({
    type = 'CLOSE_WARNING'
  })
end


CreateThread(function()
  while true do 
    if not check_screen_settings() then
      setWarning({
        tile = Config.Message.Title or 'WARNING',
        icon = Config.Message.Icon  or 'exclamation-triangle',
        message = Config.Message.Message or 'You are using incompatible settings for this server please change your display settings before the timer runs out',
        time = Config.Message.Time * 60 or 60,
      })
    else 
      closeWarning()
    end
    Wait(30000)
  end
end)